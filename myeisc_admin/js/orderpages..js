var CurrentDisplayOrderId = -1;
var CurrentDisplayCustomerId = -1;
var CurrentOrderIndex = -1;
var CurrentTotalRecords = -1;
var CurrentOrderData;
var CurrentDisplayCustomerIP = "";
var CurrentDisplayCustomerIPBlock = "";

var pinEnabled = false;

var RecordSetSize = 50;
var RecordBreakPointID = 0;

var Orders = [];
var SelectedOrders = [];
var countOfHeaderRows = 0;
var tempheaderId = "";
var altRowTraker = 0;
var customerId = "";
var loadingOrderList = false;
var orderListHeader = "";
var bulkMode = true;

var iframeSrc;
var checkForNewOrdersTiming = 60000; /*60000 = 1 Minute */
var checkForNewOrdersTimeOutID;
var timeOutID;
var loadSpinnerTimeOutID;

var outAffect;
var outStartPos;
var inAffect;
var inStartPos;

var editMode = false;

var setUpDatePicker = true;
var printSettingsData;
var printSettingsNeedSaving = false;
var printDialogOpen = false;
var statusSelectorOpen = false;
var debuggingOn = false;

var verify = "False";
var lastAddedPrice = 0;
var lastAddedName = "";

var BillingVerified = true;
var ShippingVerified = true;

function AjaxHandler(callName, callData, callSuccess)
{
    $("#topWindowsAccess").show();
    
    debug(callName);
     
    if (typeof (callData) != "string") callData = JSON.stringify(callData);
    // If you pass callData to this function as a string you need to make sure doulbe quote marks are escaped.

    $.ajax({
        'type': "POST",
        'contentType': "application/json; charset=utf-8",
        'url': "./AjaxHandler.asmx/" + callName,
        'cache': false,
        'data': callData,
        'dataType': "json",
        'success': function(responseData) { handleResponse(responseData, callSuccess); $("#topWindowsAccess").hide(); },
        'error': handleError
    });
}

function debug(debugData) {
    if (debuggingOn) {
        var now = new Date(); 
        $("#debugDiv").append("<div class='" + "divId" + now.getHours() + "00"+ now.getMinutes() + "00" + now.getSeconds() + "'>" + now.getHours() + ":"+ now.getMinutes() + ":" + now.getSeconds() + " - " + debugData + "</div>"); 
        setTimeout("$('." + "divId" + now.getHours() + "00"+ now.getMinutes() + "00" + now.getSeconds() + "').slideUp();", 120000);
    }
}
function handleResponse(data, callSuccess) {
    if (callSuccess) {
        try {
            if (callSuccess.name) {
                debug(callSuccess.name);
            } else {
                debug(callSuccess.toString().match(/^function\s*([^\s(]+)/)[1]);
            }
        }
        catch (err) { }
    }
    
    if (data != null && data != undefined) {
        if (data.d != null && data.d != undefined) {

            if (data.d.Errors && data.d.Errors.length > 0) { debug("Error:" + data.d.Errors.join(",")); }

            if (data.d.UndoDescription != null && data.d.UndoDescription != undefined) {
                $("#undobutton").show();
                $("#undobutton").attr("title", data.d.UndoDescription)
            }

            if (!bulkMode) {
                if (data.d.UpdateValues && data.d.OrderID) {
                    if (data.d.OrderID == CurrentDisplayOrderId) {
                        updatePaymentDetails(data.d);
                    }
                }
            }
        }
    }
    if (callSuccess != null && callSuccess != undefined)
    {
        if (data != null && data != undefined && data.d != null && data.d != undefined) {
            callSuccess(data);
        }
    }
}
function handleError(XMLHttpRequest, textStatus, errorThrown) {
    $("#topWindowsAccess").hide();
    debug("<span class='errorMessage'>Error Accessing Data</span>");
}

$(document).ready(function () {

    /* Top Bar Icons */
    $("#ekmGlobalHeaderBar .top-nav .left-links").append("<li id='undobutton'><a><img src='./images/barbutton-undo.gif' alt='" + le.undo + "'><span>" + le.undo + "</span></a></li>");

    $("#undobutton").hide();
    $("#undobutton").click(function () { AjaxHandler("UndoLastEdit", "", onSuccessUndoLastEdit) });
    function onSuccessUndoLastEdit() {
        $("#undobutton").hide();
        loadOrderData(CurrentDisplayOrderId);
    }

    $("#ekmGlobalHeaderBar .top-nav .right-links").append("<li id='viewOrders' class='linksRight Selected'><a><img src='./images/ViewIcon.png' alt='" + le.viewOrders + "'><span>" + le.viewOrders + "</span></a></li>");
    $("#ekmGlobalHeaderBar .top-nav .right-links").append("<li id='addOrder' class=\"linksRight\"><a><img src='./images/IconPlus.png' alt='" + le.addQuote + "'><span>" + le.addQuote + "</span></a></li>");
    $("#ekmGlobalHeaderBar .top-nav .right-links").append("<li id='viewCustomers' class=\"linksRight\"><a><img src='./images/ViewIcon.png' alt='" + le.viewCustomers + "'><span>" + le.viewCustomers + "</span></a></li>");
    $("#ekmGlobalHeaderBar .top-nav .right-links").append("<li id='addCustomers' class=\"linksRight\"><a><img src='./images/IconPlus.png' alt='" + le.addCustomer + "'><span>" + le.addCustomer + "</span></a></li>");

    $("#viewOrders").click(function () { window.location = "OrdersPage.aspx"; });
    $("#addOrder").click(addNewOrder);
    $("#viewCustomers").click(function () { window.location = "CustomersPage.aspx"; });
    $("#addCustomers").click(function () { window.location = "CustomersPage.aspx?custid=new"; });

    $("#editOrder").click(editOrder);
    $("#saveOrder").click(saveOrder);
    $("#cancelSaveOrder").click(cancelSaveOrder);

    $("#customerViewButton").click(function () { if (CurrentDisplayCustomerId > 0) { window.location = "CustomersPage.aspx?custid=" + CurrentDisplayCustomerId; } });

    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    /* Order List Filter Box */
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    $("#topWindowFancyLinkAdvanced").fancybox();

    $("#advancedSearch").click(function () { searchAdvanced = true; showSearchDialog(); statusSelectorRemove(); });
    
    $("#searchSubmit").click(function() { searchAdvanced = false; return false; statusSelectorRemove(); });
    $("#searchFor").click(statusSelector);
    $("#searchFor").keyup(statusSelectorDraw);
    $("#orderDetailsPane1").click(statusSelectorRemove);

    $(".ordersListGo").click(ordersListGo);
    function ordersListGo() {
        $.fancybox.close();
        CurrentOrderIndex = 9999999; /* Set CurrentOrderIndex very high so animation is right */
        loadOrderList(true);
        statusSelectorRemove();
    }
    $(".ordersListClear").click(function () {
        $("#searchForFirstName").val("");
        $("#searchForLastName").val("");
        $("#searchForCompanyName").val("");
        $("#searchForEmail").val("");
        $("#searchForTelephone").val("");
        $("#searchForOrderNumber").val("");
        $("#searchForProductID").val("");
        $("#searchForProductName").val("");
        $("#dateSelector").val("");
        $("#orderByAdvanced").val("Date");
        populateOrderByDropdownAdvanced();
        $("#orderByDirectionAdvanced").val("Descending");
        $("#filterStatusAdvanced").val("");

        $("#searchFor").val("");
        CurrentOrderBy = "Date Descending";

        searchAdvanced = false;

        CurrentOrderIndex = 9999999; /* Set CurrentOrderIndex very high so animation is right */
        loadOrderList(true);
        $.fancybox.close();
    });

    $("#ordersListAdvanced").click(function () { searchAdvanced = true; showSearchDialog(); });
    $("#orderByAdvanced").change(populateOrderByDropdownAdvanced);
    $("#orderByDirectionAdvanced").change(function() { CurrentOrderBy = jQuery.trim($("#orderByAdvanced").val() + " " + $("#orderByDirectionAdvanced").val()) });
    
    populateOrderByDropdownAdvanced();
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

    /* Bulk Mode */
    $("#toOrdersList").click(swopToFullToSmallList);
    $("#selectAllCheckbox").click(selectUnselectAll);
    $("#bulkModePrint").click(function () { if (SelectedOrders.length > 0) { showPrintDialog() } });
    $("#bulkModeDelete").click(function () { if (SelectedOrders.length > 0) { var orderNumbers = SelectedOrders.toString(); showDiaglogBox("<div class=\"dialogHeader\">" + le.DeleteConfirmation + "</div>" + le.Areyousureyouwishtodeleteorder + " " + orderNumbers.replace(/,/g, ", ") + "?", "YesNo", bulkDeleteOrder) } });

    function bulkDeleteOrder() {
        AjaxHandler("DeleteOrder", '{ OrderIDs: [' + SelectedOrders + ']}', function () { loadOrderList(true); });
    }

    $("#bulkModeChangeStatus").click(function () { if (SelectedOrders.length > 0) { showBulkStatusChangeDialog() } });

    /* Print Options */
    $("#printDialogFancyLink").fancybox({ 'onClosed' : function() { savePrintSettings(); printDialogOpen = false; }, 'scrolling': 'y-only' });
    $("#printDialogSettingsFancyLink").fancybox();

    $("#SelectorPrintStyleHtml").click(function() { printSettingsNeedSaving = true; printSettingsData.PrintFormat = "[HTML]"; redrawPrintDialog(); })
    $("#SelectorPrintStylePdf").click(function() { printSettingsNeedSaving = true; printSettingsData.PrintFormat = "[PDF]"; redrawPrintDialog(); })

    $("#printoptionsPGNShow").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayPaymentDetails = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsPGNHide").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayPaymentDetails = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsPGNaShow").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayGateway = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsPGNaHide").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayGateway = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsONShow").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayOrderNotes = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsONHide").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayOrderNotes = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsCCFShow").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayCustomFields = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsCCFHide").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayCustomFields = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsPShow").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayPrices = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsPHide").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayPrices = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsPCShow").click(function() { printSettingsNeedSaving = true; printSettingsData.HideProductCodes = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsPCHide").click(function() { printSettingsNeedSaving = true; printSettingsData.HideProductCodes = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsSLShow").click(function() { printSettingsNeedSaving = true; printSettingsData.FlipAddresses = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsSLHide").click(function() { printSettingsNeedSaving = true; printSettingsData.FlipAddresses = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsRAShow").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayReturnSlip = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsRAHide").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayReturnSlip = "FALSE"; redrawPrintDialogSettings(); });

    $("#printoptionsDDsShow").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayDiscount = "TRUE"; redrawPrintDialogSettings(); });
    $("#printoptionsDDsHide").click(function() { printSettingsNeedSaving = true; printSettingsData.DisplayDiscount = "FALSE"; redrawPrintDialogSettings(); });

    $("#PrintButton").click(showPrintDialog);

    $(".printTypeStandard").click(function() { printSettingsNeedSaving = true; printSettingsData.PaperType = "STANDARD"; redrawPrintDialogPaperType(); })
    $(".printTypeSingleLarge").click(function() { printSettingsNeedSaving = true; printSettingsData.PaperType = "SINGLE-LARGE"; redrawPrintDialogPaperType(); })
    $(".printTypeLargeTwoPage").click(function() { printSettingsNeedSaving = true; printSettingsData.PaperType = "LARGETWOPAGE"; redrawPrintDialogPaperType(); })
    $(".printTypeSingleSingleSmall").click(function() { printSettingsNeedSaving = true; printSettingsData.PaperType = "SINGLE-SINGLESMALL"; redrawPrintDialogPaperType(); })
    $(".printTypeLarge").click(function() { printSettingsNeedSaving = true; printSettingsData.PaperType = "LARGE"; redrawPrintDialogPaperType(); })
    $(".printTypeSingleSmall").click(function() { printSettingsNeedSaving = true; printSettingsData.PaperType = "SINGLESMALL"; redrawPrintDialogPaperType(); })
    $(".printTypeDoubleSmall").click(function() { printSettingsNeedSaving = true; printSettingsData.PaperType = "DOUBLESMALL"; redrawPrintDialogPaperType(); })

    
    $("#printOptionSelectorLink").click(toggleOptions);

    $(".printDialogPrintLink").click(printOnClick);
    $(".printDialogCancel").click(function () { $.fancybox.close(); });

    $("#printDialogChangeHeader").click(showPrintChangeHeader);
    $("#printDialogChangeFooter").click(showPrintChangeFooter);
    $("#printDialogChangeText").click(showPrintChangeText);


    /* Setup The Editing of the elements of the order */
    /*------------------------------------------------*/
    $("#SelectOrderType").change(setNewOrderType);
    function setNewOrderType() {
        AjaxHandler("UpdateOrderType", "{ 'OrderID': '" + CurrentDisplayOrderId + "', 'NewType': '" + cleanValue($("#SelectOrderType").val()) + "'}", setNewOrderTypeSuccess);
        CurrentOrderData.Order.OrderStatus = this.value;

        function setNewOrderTypeSuccess(data) {
            if (data.d.Value != CurrentOrderData.PaymentDetails) {
                CurrentOrderData.PaymentDetails = data.d.Value;
                if (CurrentOrderData.PaymentDetails == "<div class=\"PaymentDetailsOutput\"></div>") {
                    $("#PaymentDetails").hide();
                }
                else {
                    $("#PaymentDetails").show();
                    $("#LabelPaymentDetails").html(CurrentOrderData.PaymentDetails);
                }
            }
        }
    }

    $("#DropDownListOrderStatus").change(setNewOrderStatus);
    function setNewOrderStatus() {
        var newOrderStatusClass = this.value.replace(/\s|\./g, "").toLowerCase();
        $("#orderList" + CurrentDisplayOrderId + " > .orderListStatus > div").removeClass().addClass("orderList" + newOrderStatusClass).html(this.value.substring(0,1)).attr({ 'title': toProperCase(this.value) });
        $("#orderList" + CurrentDisplayOrderId + " .orderListStatus2 > div").removeClass().addClass("orderListStatus2" + newOrderStatusClass).html(toProperCase(this.value)).attr('title', toProperCase(this.value));
        $("#DropDownListOrderStatus").removeClass().addClass("inputBox orderListStatus2" + newOrderStatusClass);
        showStatusChangeDialog();

        CurrentOrderData.Order.OrderStatus = this.value;
    }

    // Add Functions Billing Details Area
    $("#customerLabels").hover(function () { $("#customerViewButton").stop().animate({ 'opacity': 1 }); }, function () { $("#customerViewButton").stop().animate({ 'opacity': 0 }); });

    //Edit Notes
    $("#orderNotesTab1").click(orderNotesShow);
    $("#orderNotesTab2").click(internalNotesShow);

    $("#TextBoxOrderNotes").blur(function () { AjaxHandler("UpdateOrderNotes", '{ OrderID: "' + CurrentDisplayOrderId + '", NewNotes: "' + cleanValue($("#TextBoxOrderNotes").val()) + '"}') });
    $("#TextBoxInternalNotes").blur(function () { AjaxHandler("UpdateInternalNotes", '{ OrderID: "' + CurrentDisplayOrderId + '", NewNotes: "' + cleanValue($("#TextBoxInternalNotes").val()) + '"}') });

    $("#DeleteOrder").click(function () { showDiaglogBox("<div class=\"dialogHeader\">" + le.DeleteConfirmation + "</div>" + le.Areyousureyouwishtodeleteorder + " " + CurrentOrderData.Order.OrderNumber + "?", "YesNo", deleteCurrentOrder) });

    function deleteCurrentOrder() {
        AjaxHandler("DeleteOrder", '{ OrderIDs: [' + CurrentDisplayOrderId + ']}', function () { editMode = false; loadOrderList(true); });
    }

    $("#TotalsTable").hover(function () { $(".totalsEditButton").stop().animate({ 'opacity': 1 }); }, function () { $(".totalsEditButton").stop().animate({ 'opacity': 0 }); });


    $("#transLog").click(showTransactionLogs);
    $("#debugInfo").click(function () { AjaxHandler("GetOrderDebug", '{ OrderID: ' + CurrentDisplayOrderId + '}', showDebugLogs); });

    if (allowDebug) { $("#debugInfo").show(); } else { $("#debugInfo").hide(); }

    $("#selectCustomer").click(showSelectCustomersDialog);
    $(".fixCase").click(fixCaseAddress);

    $("#totalsDeliveryButton").click(changeDeliveryMethod);
    $("#totalsRecalculateButton").click(RecalculateTotalsAndEdit);

    if (showInternalOrderNoteFirst) {
        internalNotesShow();
    } else {
        orderNotesShow();
    }

    setTimeout("loadOrderList(true)",500);

    checkForNewOrdersTimeOutID = setTimeout("checkForNewOrders(true)",checkForNewOrdersTiming);

    $("#collapseAll").click(collapseAllHeaders);

    $(window).resize(resizeOrdersList);
    resizeOrdersList();

    if (!$.browser.msie) {
        $('#hidebutton').click(resizeOrdersListUntilDone);
    }


});

function RemoveSecureFormPassword() {
    AjaxHandler("UpdateOrderType", "RemoveSecureFormPassword", RemoveSecureFormPasswordResponse);
}
function RemoveSecureFormPasswordResponse() {
    
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//

function checkForNewOrders() {
    if (!loadingOrderList)
    {
        clearTimeout(checkForNewOrdersTimeOutID);
        
        if (!searchAdvanced && Orders.length != 0) {
            if (CurrentOrderBy == "Date Descending") {

                var search = $("#searchFor").val();
                var statusFilter = "";
                var eachWordOfSearch = search.split(' ');
                for (var i = 0; i < eachWordOfSearch.length; i++) {
                    if (jQuery.inArray(eachWordOfSearch[i].toLowerCase(), statusArray) != -1)
                    {
                        statusFilter = eachWordOfSearch.splice(i,1)[0];
                    }
                }
                statusFilter = jQuery.trim(statusFilter);
                search = jQuery.trim(eachWordOfSearch.join(' '));

                AjaxHandler("GetOrderListLatest", { SearchFor: search , StatusFilter: statusFilter, lastOrderDate :  Orders[0].OrderDate }, OnSuccessGetOrderListLastest);
            }
        }

        checkForNewOrdersTimeOutID = setTimeout("checkForNewOrders(true)",checkForNewOrdersTiming);
    }

    function OnSuccessGetOrderListLastest(data) {

        if (data.d.TotalRecords != null && data.d.TotalRecords != 0) {

            var altRowInsert = "";
            for(var i = 0; i < data.d.Items.length; i++) {
                if (Math.round(altRowTraker / 2) == (altRowTraker / 2)) { altRowInsert = " orderListAltRow"; } else { altRowInsert = ""; }

                var transEkmStatus = "";
                var transEkmStatusTitle = "";
                if (data.d.Items[i].EkmStatus == 'FAILED') {
                    transEkmStatus = le.PaymentFailed;
                }else if (data.d.Items[i].EkmStatus == 'SUCCESS'){
                    transEkmStatus =  le.PaymentSuccess;
                }else{
                   transEkmStatus = le.PaymentUnknown;
                }
                transEkmStatusTitle = transEkmStatus;

                var tmpStatusDetails = "";
                if (data.d.Items[i].OrderType != null && data.d.Items[i].OrderType != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.OrderType + " : </strong>" + toProperCase(data.d.Items[i].OrderType) + "<br />";
                    transEkmStatusTitle = transEkmStatusTitle + le.OrderType + " : " + toProperCase(data.d.Items[i].OrderType) + "\n\r";
                }

                if (data.d.Items[i].TransStatus != null && data.d.Items[i].TransStatus != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.TransactionStatus + " : </strong>" + data.d.Items[i].TransStatus;
                    transEkmStatusTitle = transEkmStatusTitle + le.TransactionStatus + " : " + data.d.Items[i].TransStatus + "\n\r";
                }
                if (data.d.Items[i].TransStatusMsg != null && data.d.Items[i].TransStatusMsg != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.TransactionMessage + " : </strong>" + data.d.Items[i].TransStatusMsg;
                    transEkmStatusTitle = transEkmStatusTitle + le.TransactionMessage + " : " + data.d.Items[i].TransStatusMsg + "\n\r";
                }
                if (data.d.Items[i].TransId != null && data.d.Items[i].TransId != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.TransactionId + " : </strong>" + data.d.Items[i].TransId;
                    transEkmStatusTitle = transEkmStatusTitle + le.TransactionId + " : " + data.d.Items[i].TransId + "\n\r";
                }

                altRowTraker++;
                if (data.d.ContextDataType == "date") {
                    lastestTempheaderId = data.d.Items[i].HeaderData.toLowerCase().replace(/[\s|.|&|;|/]/g, "");
                    if ($("#Div" + lastestTempheaderId).length == 0) {
                        $("#itemListInner").prepend("<div onclick=\"showHideItems('" + lastestTempheaderId + "')\"><div class='orderListHeader'><div id='Image" + lastestTempheaderId + "' class='orderListHeaderImage'>&#9660;</div>" + data.d.Items[i].HeaderData + "</div></div><div class='orderListContent divOrderListItems' id='Div" + lastestTempheaderId + "' class=''></div>");

                    }
                    $("#Div" + lastestTempheaderId).prepend("<div id='orderList" + data.d.Items[i].OrderId + "' class='orderListItem " + altRowInsert + " " + lastestTempheaderId + "Group'><div class='orderListSelector hideWhenSmall' onclick='selectOrders(" + data.d.Items[i].OrderId + ")'><input type='checkbox' class='orderListCheckBox' value='" + data.d.Items[i].OrderId + "' /></div><div class='orderListStatus'><div title='" + lePending(data.d.Items[i].OrderStatus) + "' class='orderList" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'>" + lePending(data.d.Items[i].OrderStatus).substring(0, 1) + "</div></div><div class='itemListSelectOrderDiv' onclick='selectOrder(" + data.d.Items[i].OrderId + ")'><div class='orderListStatus2 hideWhenSmall orderListStatus2" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'><div title='" + data.d.Items[i].OrderStatus + "'>" + lePending(data.d.Items[i].OrderStatus) + "</div></div><div class='orderListEkmStatus'><div class='uifw-tooltip tt-yellow smalldot " + data.d.Items[i].EkmStatus.replace(/\'/g, "&#39;") + "' title='" + transEkmStatusTitle.replace(/\'/g, "&#39;") + "' data-title='" + transEkmStatus.replace(/\'/g, "&#39;") + "' data-desc='" + tmpStatusDetails.replace(/\'/g, "&#39;") + "'></div></div><div class='orderListNumber'>" + data.d.Items[i].OrderId + "</div><div class='orderListCustomerName' title='" + data.d.Items[i].CustomerName + "'>" + data.d.Items[i].CustomerName + "</div><div class='orderListOrderDate hideWhenSmall'>" + data.d.Items[i].OrderDate + "</div><div class='orderListValue'>" + currencySymbolBeforeAfter(data.d.Items[i].Price) + "</div></div></div>");
                    SectionOrders.unshift(data.d.Items[i].OrderId);
                }

                jQuery('.uifw-tooltip:first').each(function(){
                    var el = jQuery(this);
                       
                    var title = el.attr('data-title');
                    var desc =  el.attr('data-desc');

                    el.uifwTooltipPopup2({
				        'title': title,
				        'description': desc,
				        'theme': 'yellow',
                        'direction': 'right',
                        'width': 'auto',
			            'maxWidth': 400,
			            'minWidth': 200
			        });
                });

                Orders.unshift(data.d.Items[i]);
            }
        }
    } 
}

function statusSelector() {
    if (statusSelectorOpen) {
        statusSelectorRemove();
    }
    else {
        statusSelectorDraw();
    }
}

function statusSelectorDraw() {
    $("#statusSelector").remove();
    var statusSelectorHtml = "<div id='statusSelector' style='width:" + ($("#searchFor").width() + 10) + "px;'>";
    var searchForVal = $("#searchFor").val().toLowerCase();
    for (var i = 0; i < statusArray.length; i++) {
        if (lePending(statusArray[i]).toLowerCase().indexOf(searchForVal) != -1 || searchForVal.length == 0) {
            statusSelectorHtml += "<div onclick='statusSelect(" + i + ")' class='orderListStatus2" + statusArray[i].replace(/[\s|.|&|;|/]/g, "") + "'>" + toProperCase(lePending(statusArray[i])) + "</div>";
        }
    }
    statusSelectorHtml += "</div>";
    $("#statusSelectorWrapper").html(statusSelectorHtml);   
    statusSelectorOpen = true;
    $("#statusSelector").bind("mouseleave", statusSelectorRemove).fadeIn();
}

function statusSelectorRemove() {
    if (statusSelectorOpen) {
        $("#statusSelector").fadeOut(300); 
        statusSelectorOpen = false;
    }
}

function statusSelect(statusId) {
    $("#searchFor").val(jQuery.trim(toProperCase(lePending(statusArray[statusId]))));
    $("#statusSelector").fadeOut(300, function() { $("#statusSelector").remove() });
    searchAdvanced = false;
    loadOrderList(true);
}

var switchingMode = false;
function editOrder() {
    if (!switchingMode) {
        switchingMode = true;
        editMode = true;
        $("#customerLabels").fadeOut(300, function () { $("#customerInput").fadeIn(300, function() { switchingMode = false;}); });
        $("#shippingLabels").fadeOut(300, function () { $("#shippingInput").fadeIn(300, function() { switchingMode = false;}); });
        displayOrderDetailsEdit();

        $("#saveOrder").show();
        $("#cancelSaveOrder").show();
        $("#editOrder").hide();
        $("#DeleteOrder").show();
        $("#PrintButton").hide();
        $("#totalsRecalculateButton").hide();
        $("#courierPigeonBox").fadeOut(300);
    }
}

function saveOrder() {

    if (!switchingMode) {
        
        var customerData = {
            '__type': 'DAL.CustomerObjectLiteOP',
            'Id': CurrentDisplayCustomerId,
            'Firstname': $("#inputFirstname").val(),
            'Lastname': $("#inputLastname").val(),
            'Company': $("#inputCompany").val(),
            'Town': $("#inputTown").val(),
            'Address1': $("#inputAddress1").val(),
            'Address2': $("#inputAddress2").val(),
            'County': $("#inputCounty").val(),
            'Country': $("#inputCountry").val(),
            'Postcode': $("#inputPostcode").val(),
            'Email': $("#inputEmail").val(),
            'Telephone': $("#inputTelephone").val(),
            'Fax': $("#inputFax").val()
            };

        CurrentOrderData.Customer.Firstname = $("#inputFirstname").val();
        CurrentOrderData.Customer.Lastname = $("#inputLastname").val();
        CurrentOrderData.Customer.Company = $("#inputCompany").val();
        CurrentOrderData.Customer.Town = $("#inputTown").val();
        CurrentOrderData.Customer.Address1 = $("#inputAddress1").val();
        CurrentOrderData.Customer.Address2 = $("#inputAddress2").val();
        CurrentOrderData.Customer.County = $("#inputCounty").val();
        CurrentOrderData.Customer.Country = $("#inputCountry").val();
        CurrentOrderData.Customer.Postcode = $("#inputPostcode").val();
        CurrentOrderData.Customer.Email = $("#inputEmail").val();
        CurrentOrderData.Customer.Telephone = $("#inputTelephone").val();
        CurrentOrderData.Customer.Fax = $("#inputFax").val();

        $("#orderList" + CurrentDisplayOrderId + " .orderListCustomerName").html(CurrentOrderData.Customer.Firstname + " " + CurrentOrderData.Customer.Lastname);

        var orderShippingData = {
            '__type': 'DAL.OrderShippingUpdateAjax',
            'ShippingFirstname' : $("#inputShippingFirstname").val(),
            'ShippingLastname' : $("#inputShippingLastname").val(),
            'ShippingCompany' : $("#inputShippingCompany").val(),
            'ShippingAddress1' : $("#inputShippingAddress1").val(),
            'ShippingAddress2' : $("#inputShippingAddress2").val(),
            'ShippingTown' : $("#inputShippingTown").val(),
            'ShippingCounty' : $("#inputShippingCounty").val(),
            'ShippingCountry' : $("#inputShippingCountry").val(),
            'ShippingPostcode': $("#inputShippingPostcode").val(),
            'ShippingTelephone': $("#inputShippingTelephone").val()
            
            };

        CurrentOrderData.Order.ShippingFirstname = $("#inputShippingFirstname").val();
        CurrentOrderData.Order.ShippingLastname = $("#inputShippingLastname").val();
        CurrentOrderData.Order.ShippingCompany = $("#inputShippingCompany").val();
        CurrentOrderData.Order.ShippingAddress1 = $("#inputShippingAddress1").val();
        CurrentOrderData.Order.ShippingAddress2 = $("#inputShippingAddress2").val();
        CurrentOrderData.Order.ShippingTown = $("#inputShippingTown").val();
        CurrentOrderData.Order.ShippingCounty = $("#inputShippingCounty").val();
        CurrentOrderData.Order.ShopCountryCode = $("#inputShippingCountry").val();
        CurrentOrderData.Order.ShippingPostcode = $("#inputShippingPostcode").val();
        CurrentOrderData.Order.ShippingTelephone = $("#inputShippingTelephone").val();

        if (editMode) putOrderItemValuesIntoObject();
        switchingMode = true;
        editMode = false;
        
        AjaxHandler("UpdateOrdersDetails", '{ "OrderId": "' + CurrentDisplayOrderId + '", "customerData": ' + JSON.stringify(customerData) + ', "orderShippingData": ' + JSON.stringify(orderShippingData) + ', "OrderItems": ' + JSON.stringify(CurrentOrderData.OrderItems) + ', "Discounts": "' + cleanValue(CurrentOrderData.Order.Discounts) + '", "DiscountsTotal": "' + CurrentOrderData.Order.DiscountsTotal + '" }', OnSuccessUpdateOrdersDetails);
        

    }
}

function OnSuccessUpdateOrdersDetails(data) {

    if (data.d.Value != 0) CurrentDisplayCustomerId = data.d.Value;
    $("#orderList" + CurrentDisplayOrderId + " > .orderListCustomerName").html($("#inputFirstname").val() + " " + $("#inputLastname").val());

    if ($("#ordersItemInputDetails0").val() != "" && $("#ordersItemInputDetails0").val() != undefined)
        { addOrderItem(true); }
    else
        { RecalculateTotals(); }
    
    switchCustomerDetailsToNormalMode();
    switchShippingDetailsToNormalMode();
    displayOrderDetails();
    saveEditButtonFlip();
}

function cancelSaveOrder() {
    if (!switchingMode) {
        switchingMode = true;
        editMode = false;

        $("#inputFirstname").val(CurrentOrderData.Customer.Firstname);
        $("#inputLastname").val(CurrentOrderData.Customer.Lastname);
        $("#inputCompany").val(CurrentOrderData.Customer.Company);
        $("#inputAddress1").val(CurrentOrderData.Customer.Address1);
        $("#inputAddress2").val(CurrentOrderData.Customer.Address2);
        $("#inputTown").val(CurrentOrderData.Customer.Town);
        $("#inputCounty").val(CurrentOrderData.Customer.County);
        if (CurrentOrderData.Customer.Country == "" || CurrentOrderData.Customer.Country == null) {
            $("#inputCountry").val(ShopCountryCode);
            $("#LabelCountry").html("");
        }
        else {
            $("#inputCountry").val(CurrentOrderData.Customer.Country);
            $("#LabelCountry").html(document.getElementById("inputCountry").options[document.getElementById("inputCountry").selectedIndex].text);
        }

        $("#inputPostcode").val(CurrentOrderData.Customer.Postcode);

        $("#inputEmail").val(CurrentOrderData.Customer.Email);
        $("#inputTelephone").val(CurrentOrderData.Customer.Telephone);
        $("#inputFax").val(CurrentOrderData.Customer.Fax);

        $("#LabelCustomerName").html(CurrentOrderData.Customer.Firstname + " " + CurrentOrderData.Customer.Lastname);
        $("#LabelCompany").html(CurrentOrderData.Customer.Company);
        $("#LabelAddress1").html(CurrentOrderData.Customer.Address1);
        $("#LabelAddress2").html(CurrentOrderData.Customer.Address2);
        $("#LabelTown").html(CurrentOrderData.Customer.Town);
        $("#LabelCounty").html(CurrentOrderData.Customer.County);

        $("#LabelPostcode").html(CurrentOrderData.Customer.Postcode);

        $("#LabelEmail").html(CurrentOrderData.Customer.Email);
        $("#LabelTelephone").html(CurrentOrderData.Customer.Telephone);
        $("#LabelFax").html(CurrentOrderData.Customer.Fax);

        if (CurrentOrderData.Order.ShippingCountry == "" || CurrentOrderData.Order.ShippingCountry == null)
            $("#inputShippingCountry").val(ShopCountryCode);
        else
            $("#inputShippingCountry").val(CurrentOrderData.Order.ShippingCountry);

        if (CurrentOrderData.Order.DifferentShippingAddress != false) {
            $("#inputShippingFirstname").val(CurrentOrderData.Order.ShippingFirstname);
            $("#inputShippingLastname").val(CurrentOrderData.Order.ShippingLastname);
            $("#inputShippingCompany").val(CurrentOrderData.Order.ShippingCompany);
            $("#inputShippingAddress1").val(CurrentOrderData.Order.ShippingAddress1);
            $("#inputShippingAddress2").val(CurrentOrderData.Order.ShippingAddress2);
            $("#inputShippingTown").val(CurrentOrderData.Order.ShippingTown);
            $("#inputShippingCounty").val(CurrentOrderData.Order.ShippingCounty);

            $("#LabelShippingCountry").html(document.getElementById("inputShippingCountry").options[document.getElementById("inputShippingCountry").selectedIndex].text);
            $("#inputShippingPostcode").val(CurrentOrderData.Order.ShippingPostcode);
            $("#inputShippingTelephone").val(CurrentOrderData.Order.ShippingTelephone);

            $("#LabelShippingCustomerName").html(CurrentOrderData.Order.ShippingFirstname + " " + CurrentOrderData.Order.ShippingLastname);
            $("#LabelShippingCompany").html(CurrentOrderData.Order.ShippingCompany);
            $("#LabelShippingAddress1").html(CurrentOrderData.Order.ShippingAddress1);
            $("#LabelShippingAddress2").html(CurrentOrderData.Order.ShippingAddress2);
            $("#LabelShippingTown").html(CurrentOrderData.Order.ShippingTown);
            $("#LabelShippingCounty").html(CurrentOrderData.Order.ShippingCounty);
            $("#LabelShippingPostcode").html(CurrentOrderData.Order.ShippingPostcode);
            $("#LabelShippingTelephone").html(CurrentOrderData.Order.ShippingTelephone);

            $("#sameAsBillingMessage").hide();
            $("#shippingLabelTable").show();

        }
        else {
            $("#inputShippingFirstname").val("");
            $("#inputShippingLastname").val("");
            $("#inputShippingCompany").val("");
            $("#inputShippingAddress1").val("");
            $("#inputShippingAddress2").val("");
            $("#inputShippingTown").val("");
            $("#inputShippingCounty").val("");
            $("#inputShippingPostcode").val("");
            $("#inputShippingTelephone").val("");

            $("#LabelShippingCustomerName").html("");
            $("#LabelShippingCompany").html("");
            $("#LabelShippingAddress1").html("");
            $("#LabelShippingAddress2").html("");
            $("#LabelShippingTown").html("");
            $("#LabelShippingCounty").html("");
            $("#LabelShippingCountry").html("");
            $("#LabelShippingPostcode").html("");
            $("#LabelShippingTelephone").html("");

            $("#sameAsBillingMessage").show();
            $("#shippingLabelTable").hide();

            ShippingClipboard = "";
        }

        switchCustomerDetailsToNormalMode();
        switchShippingDetailsToNormalMode();
        displayOrderDetails();
        saveEditButtonFlip();
    }
}

function saveEditButtonFlip() {
    if (editMode == true){
        $("#saveOrder").show(); 
        $("#cancelSaveOrder").show();
        $("#editOrder").hide();
        $("#DeleteOrder").show();
        $("#PrintButton").hide();
        $("#totalsRecalculateButton").hide();
        $("#courierPigeonBox").fadeOut(300);
    }
    else {
        $("#saveOrder").hide(); 
        $("#cancelSaveOrder").hide();
        $("#editOrder").show();
        $("#DeleteOrder").hide();
        $("#PrintButton").show();
        $("#totalsRecalculateButton").show();
        setTimeout(function () { $("#courierPigeonBox").show(); }, 300);
    }
}

function selectUnselectAll() {
    var selectAllCheckboxVal = $("#selectAllCheckbox").attr("checked");
    
    if (selectAllCheckboxVal) {
        SelectedOrders = [];
        for (var i = 0; i < Orders.length; i++) {
            SelectedOrders.push(Orders[i].OrderId);
        }
        $(".orderListItem").addClass("orderListSelected");
        $(".orderListItem .orderListCheckBox").attr("checked", "checked");
    }
    else 
    {
        $(".orderListItem").removeClass("orderListSelected");
        $(".orderListItem .orderListCheckBox").attr("checked", "");
        SelectedOrders = [];
        CurrentDisplayOrderId = -1;
    }
    upDateSummary();
}

function switchCustomerDetailsToNormalMode() {
    $("#LabelCustomerName").html($("#inputFirstname").val() + " " + $("#inputLastname").val());
    $("#LabelCompany").html($("#inputCompany").val());
    $("#LabelAddress1").html($("#inputAddress1").val());
    $("#LabelAddress2").html($("#inputAddress2").val());
    $("#LabelTown").html($("#inputTown").val());
    $("#LabelCounty").html($("#inputCounty").val());
    $("#LabelCountry").html(document.getElementById("inputCountry").options[document.getElementById("inputCountry").selectedIndex].text);
    $("#LabelPostcode").html($("#inputPostcode").val());
    $("#LabelEmail").html($("#inputEmail").val());
    $("#LabelTelephone").html($("#inputTelephone").val());
    $("#LabelFax").html($("#inputFax").val());
    $("#customerInput").fadeOut(300, function () { $("#customerLabels").fadeIn(300, function() { switchingMode = false;}); });
}

function switchShippingDetailsToNormalMode() {
    $("#LabelShippingCustomerName").html($("#inputShippingFirstname").val() + " " + $("#inputShippingLastname").val());
    $("#LabelShippingCompany").html($("#inputShippingCompany").val());
    $("#LabelShippingAddress1").html($("#inputShippingAddress1").val());
    $("#LabelShippingAddress2").html($("#inputShippingAddress2").val());
    $("#LabelShippingTown").html($("#inputShippingTown").val());
    $("#LabelShippingCounty").html($("#inputShippingCounty").val());
    $("#LabelShippingPostcode").html($("#inputShippingPostcode").val());
    $("#LabelShippingTelephone").html($("#inputShippingTelephone").val());

    if (jQuery.trim($("#inputShippingFirstname").val()).length == 0 && jQuery.trim($("#inputShippingLastname").val()).length == 0 && jQuery.trim($("#inputShippingCompany").val()).length == 0 && jQuery.trim($("#inputShippingAddress1").val()).length == 0 && jQuery.trim($("#inputShippingAddress2").val()).length == 0 && jQuery.trim($("#LabelShippingCounty").val()).length == 0 && jQuery.trim($("#LabelShippingPostcode").val()).length == 0 && jQuery.trim($("#LabelShippingTelephone").val()).length == 0) {
        $("#sameAsBillingMessage").show();
        $("#shippingLabelTable").hide();
        $("#LabelShippingCustomerName").html($("#inputShippingFirstname").val() + " " + $("#inputShippingLastname").val());
    }
    else {
        $("#sameAsBillingMessage").hide();
        $("#shippingLabelTable").show();
        $("#LabelShippingCountry").html(document.getElementById("inputShippingCountry").options[document.getElementById("inputShippingCountry").selectedIndex].text);
    }
    $("#shippingInput").fadeOut(300, function () { $("#shippingLabels").fadeIn(300, function() { switchingMode = false;}); });
}

function showSearchDialog() {
    $("#topWindowFancyLinkAdvanced").trigger('click');
    if (setUpDatePicker) {
        $('#dateSelector').daterangepicker({
            'arrows': false,
            'dateFormat': 'd/m/yy',
            'presets': { 'specificDate': 'Specific Date', 'dateRange': 'Date Range' },
            'rangeSplitter': ' to ',
            'changeMonth': true,
            'changeYear': true,
            'posX': function() { return ($(window).width() / 2) - 240; },
            'posY': function() { return ($(window).height() / 2) + 120; }
        });
        setUpDatePicker = false;
    }
    $.fancybox.resize();
}

function populateOrderByDropdownAdvanced() {
    var filterStatus = $("#orderByAdvanced").val();
    if (filterStatus == "Name" || filterStatus == "Status") { $("#orderByDirectionAdvanced").html("<option value=\"\">" + le.AtoZ + "</option><option value=\"Descending\">" + le.ZtoA + "</option>"); }
    if (filterStatus == "Date" || filterStatus == "OrderNumber") { $("#orderByDirectionAdvanced").html("<option value=\"Descending\">" + le.NewestFirst + "</option><option value=\"\">" + le.OldestFirst + "</option>"); }
    if (filterStatus == "Price") { $("#orderByDirectionAdvanced").html("<option value=\"Descending\">" + le.HighestFirst + "</option><option value=\"\">" + le.LowestFirst + "</option>"); }

    CurrentOrderBy = jQuery.trim($("#orderByAdvanced").val() + " " + $("#orderByDirectionAdvanced").val());
}

function showStatusChangeDialog(orderNumbers) {

    var innerHtml = "<div class='dialogBox'><div id='sscDialogBoxFirst' class='sscDialogBox'>";
    innerHtml += "<div class='dialogHeader'>" + le.SendOrderStatusUpdateEmail + "</div>";
    innerHtml += "<div class='dialogHelpText'>" + le.Doyouwishtosendthecustomeranemailinformingthemofthestatus + " " + le.Ifyouneedtochangethetemplateofthisemailclicktheedittemplatebutton + "</div>";
    innerHtml += "<div class='dialogBoxButtons'>";

    innerHtml += "<a id='sscDialogBoxChangeTemplate' href='#' class='uifw-frm-button uifw-icon dialogBoxOther'><i class='icon-pencil'></i>" + le.EditTemplate + "</a>";

    innerHtml += "<a id='sscDialogBoxNegative' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-save'></i>" + le.Save + "</a>";

    innerHtml += "<a id='sscDialogBoxPositive' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-share'></i>" + le.SaveEmail + "</a>";

    innerHtml += "</div></div><div class='clearBoth'></div></div>";
    $.fancybox(innerHtml);

    $("#sscDialogBoxPositive").click(function () { AjaxHandler("UpdateOrderStatusReturnEmail", "{ 'OrderID': '" + CurrentDisplayOrderId + "', 'NewStatus': '" + cleanValue($("#DropDownListOrderStatus").val()) + "'}", showSendStatusChangeEmailDialog); });
    $("#sscDialogBoxNegative").click(function () { $.fancybox.close(); AjaxHandler("UpdateOrderStatus", "{ 'OrderID': [" + CurrentDisplayOrderId + "], 'NewStatus': '" + cleanValue($("#DropDownListOrderStatus").val()) + "', 'sendEmail' : false}", OnSuccessNewOrderStatuses); });

    $("#sscDialogBoxChangeTemplate").click(function() { showTemplateEditor(false) });

}

function showSendStatusChangeEmailDialog(Data) {

    var subject = Data.d.Value.split("[/SUBJECT]")[0].replace("[SUBJECT]", "");
    var content = Data.d.Value.split("[/SUBJECT]")[1];

    loadLoyaltyPointDataData(CurrentDisplayOrderId);

    var innerHtml = "<div id='sscDialogBoxSecond' class='dialogBox'>";
    innerHtml += "<div class='dialogHeader'>" + le.SendOrderStatusUpdateEmail + "</div>";
    innerHtml += le.CC + "<input type='text' id='sscCC' class='inputBox' style='width:469px;' /><br>";
    innerHtml += "<input type='text' class='inputBox' value='" + subject.replace(/["']/g, "&apos;") + "' id='sscSubject' /><br>";
    innerHtml += "<textarea id='sscContent' class='inputBox'>" + content.replace(/<br \/>/g, "\n\r") + "</textarea>";
    innerHtml += "<div class='dialogBoxButtons'>";

    innerHtml += "<a id='sscDialogBoxPositive' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-share'></i>" + le.Send + "</a>";

    innerHtml += "<a id='sscDialogBoxNegative' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-remove'></i>" + le.Cancel + "</a>";

    innerHtml += "</div>";
    innerHtml += "<div class='clearBoth'></div>";
    innerHtml += "</div>";

    $.fancybox(innerHtml);

    $("#sscDialogBoxSecond .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
    $("#sscDialogBoxSecond .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

    $("#sscDialogBoxNegative").click(function () { $.fancybox.close(); });
    $("#sscDialogBoxPositive").click(function () { AjaxHandler("SendEmail", "{ 'ID': " + CurrentDisplayCustomerId + ", 'Subject': '" + cleanValue($("#sscSubject").val()) + "', 'CC' : '" + cleanValue($("#sscCC").val()) + "', 'Message' : '" + cleanValue($("#sscContent").val()) + "' }", function() { $.fancybox.close(); } )});
}

function showBulkStatusChangeDialog() {

    var innerHtml = "<div class='dialogBox'><div class='dialogHeader'>" + le.ChangeOrderStatus + "</div>";
    innerHtml += "<div id='sscDialogBoxFirst' class='sscDialogBox'>";
    innerHtml += "<div id='sscDialogBoxChangeStatusTo'>" + le.ChangeOrderStatusto + " <select id='bulkChangeStatus' class='inputBox'>"
    innerHtml += bulkStatusDropdown + "</select></div>";
    innerHtml += "<div class='dialogHelpText'>" + le.Doyouwishtosendthecustomeranemailinformingthemofthestatus + " " + le.Ifyouneedtochangethetemplateofthisemailclicktheedittemplatebutton + "</div>";
    innerHtml += "<div class='dialogBoxButtons'>";

    innerHtml += "<a id='sscDialogBoxChangeTemplate' href='#' class='uifw-frm-button uifw-icon dialogBoxOther'><i class='icon-pencil'></i>" + le.EditTemplate + "</a>";

    innerHtml += "<a id='sscDialogBoxNegative' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-save'></i>" + le.Save + "</a>";

    innerHtml += "<a id='sscDialogBoxPositive' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-share'></i>" + le.SaveEmail + "</a>";

    innerHtml += "</div><div class='clearBoth'></div></div>";
    $.fancybox(innerHtml);

    $("#bulkChangeStatus").focusin(function () { $(this).addClass("inputBoxFocus"); });
    $("#bulkChangeStatus").focusout(function () { $(this).removeClass("inputBoxFocus"); });

    $("#sscDialogBoxPositive").click(function () { doUpdateOrderStatus(true) });
    $("#sscDialogBoxNegative").click(function () { doUpdateOrderStatus(false) });

    $("#sscDialogBoxChangeTemplate").click(function () { showTemplateEditor(SelectedOrders.toString()) });

    function doUpdateOrderStatus(sendEmail) {
        var bulkChangeStatus = toProperCase($("#bulkChangeStatus").val());
        var newOrderStatusClass = $("#bulkChangeStatus").val().replace(/\s/g, "").toLowerCase();
        for (i = 0; i <= SelectedOrders.length - 1; i++) {
            $("#orderList" + SelectedOrders[i] + " > .orderListStatus > div").removeClass().addClass("orderList" + newOrderStatusClass).html(bulkChangeStatus.substring(0,1)).attr({ 'title': bulkChangeStatus });
            $("#orderList" + SelectedOrders[i] + " .orderListStatus2 > div").removeClass().addClass("orderListStatus2" + newOrderStatusClass).html(toProperCase(bulkChangeStatus)).attr('title',bulkChangeStatus);
        }
        var orderNumbers = SelectedOrders.toString();
        orderNumbers = "'" + orderNumbers.replace(/,/g, "', '") + "'";
        var newOrderStatus = $("#bulkChangeStatus").val().replace(/"/g, "\\\"");
        if (sendEmail) {
            AjaxHandler("UpdateOrderStatusesReturnEmail", "{ 'OrderIDs': [" + orderNumbers + "], 'NewStatus': '" + newOrderStatus + "'}", showSendStatusesChangeEmailDialog);

        }
        else {
            AjaxHandler("UpdateOrderStatus", "{ 'OrderID': [" + orderNumbers + "], 'NewStatus': '" + newOrderStatus + "', 'sendEmail' : false}", OnSuccessNewOrderStatuses);
            $.fancybox.close();
        }
    }
}

function OnSuccessNewOrderStatuses(Data) {
    if (Data.d.Value != "" && Data.d.Value != null) 
    { 
        if (Data.d.Value.indexOf("<br>") > 0)
        {
            msgArr = Data.d.Value.split("<br>")
            for (i=0; i<msgArr.length; i++)
            {
                if(msgArr[i] != "") {
                    setTimeout("Notification('" + msgArr[i] + "');",i*1000);
                }
                if (shopUsesLoyaltyPoints) {
                    if (msgArr[i].indexOf(CurrentOrderData.Order.OrderNumber))
                    {
                        loadLoyaltyPointDataData(CurrentOrderData.Order.Id);
                    }
                }
            }
        }
        else
        {
            showDiaglogBox("<div class=\"dialogHeader\">" + le.OrderEmail + "</div>" + Data.d.Value, "Close");

            if (Data.d.message != "" && Data.d.message != null) {
                showDiaglogBox("<div class=\"dialogHeader\">" + le.OrderEmail + "</div>" + Data.d.message, "Close");
            }
        }
    }
}

function showSendStatusesChangeEmailDialog(Data) {

    var subject = Data.d.Value.split("[/SUBJECT]")[0].replace("[SUBJECT]", "");
    var content = Data.d.Value.split("[/SUBJECT]")[1];

    var innerHtml = "<div id='sscDialogBoxSecond' class='dialogBox'>";
    innerHtml += "<div class='dialogHeader'>" + le.SendOrderStatusUpdateEmail + "</div>";
    innerHtml += "<div style='text-align:right;'>" + le.TO + " <div id='sscTO'>" + SelectedOrders.toString().replace(/,/g, ", ")+ "</div></div>";
    innerHtml += "<div style='text-align:right;'>" + le.CC + " <input type='text' id='sscCC' class='inputBox' style='width:469px;' /></div>";
    innerHtml += "<input type='text' class='inputBox' value='" + subject.replace(/["']/g, "&apos;") + "' id='sscSubject' /><br>";
    innerHtml += "<textarea id='sscContent' class='inputBox'>" + content + "</textarea>";
    innerHtml += "<div class='dialogBoxButtons'>";

    innerHtml += "<a id='sscDialogBoxPositive' href='#' class='uifw-frm-button uifw-icon sscDialogBoxPositive'><i class='icon-share'></i>" + le.Send + "</a>";

    innerHtml += "<a id='sscDialogBoxNegative' href='#' class='uifw-frm-button uifw-icon sscDialogBoxNegative'><i class='icon-remove'></i>" + le.Cancel + "</a>";

    innerHtml += "</div>";
    innerHtml += "<div class='clearBoth'></div>";
    innerHtml += "</div>";

    $.fancybox(innerHtml);

    $("#sscDialogBoxSecond .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
    $("#sscDialogBoxSecond .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

    $("#sscDialogBoxNegative").click(function () { $.fancybox.close(); });
    $("#sscDialogBoxPositive").click(function () { $.fancybox.close(); AjaxHandler("SendEmails", "{ 'OrderIDs': [" + SelectedOrders + "], 'Subject': '" + cleanValue($("#sscSubject").val()) + "', 'CC' : '" + cleanValue($("#sscCC").val()) + "', 'Message' : '" + cleanValue($("#sscContent").val()) + "' }", OnSuccessNewOrderStatuses)});
}

function showTemplateEditor(backToBulk) {
    var tempStatus;
    if (bulkMode) { tempStatus = $("#bulkChangeStatus").val(); } else { tempStatus = $("#DropDownListOrderStatus").val(); }

    AjaxHandler("GetStatusEmailTemplate", {'Status': tempStatus }, OnSuccessGetStatusEmailTemplate);

    function OnSuccessGetStatusEmailTemplate(Data) {
        var status = Data.d.Value.split("[/STATUS]")[0].replace("[STATUS]", "");
        var subjectContent = Data.d.Value.split("[/STATUS]")[1];
        var subject = subjectContent.split("[/SUBJECT]")[0].replace("[SUBJECT]", "");
        var content = subjectContent.split("[/SUBJECT]")[1];

        var innerHtml = "<div class='dialogBox'><div class='dialogHeader'>" + le.EditTemplate + " '" + toProperCase(status) + "'</div>";

        innerHtml += "<div id='sscDialogBoxSecond' class='sscDialogBox'>";
        innerHtml += "<input type='text' class='inputBox' value='" + subject + "' id='sscSubject' /><br>";
        innerHtml += "<textarea id='sscContent' class='inputBox'>" + content + "</textarea>";

        innerHtml += "<div class='dialogBoxButtons'>";

        innerHtml += "<a id='sscDialogBoxPositive' href='#' class='uifw-frm-button uifw-icon sscDialogBoxPositive'><i class='icon-share'></i>" + le.Send + "</a>";

        innerHtml += "<a id='sscDialogBoxNegative' href='#' class='uifw-frm-button uifw-icon sscDialogBoxNegative'><i class='icon-remove'></i>" + le.Cancel + "</a>";

        innerHtml += "</div><div class='clearBoth'></div></div>";
        $.fancybox(innerHtml);

        $("#sscDialogBoxSecond .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
        $("#sscDialogBoxSecond .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

        if (backToBulk) {
            $("#sscDialogBoxNegative").click(function () { showBulkStatusChangeDialog(); });
            $("#sscDialogBoxPositive").click(function () {
                AjaxHandler("UpdateStatusEmailTemplate", { 'Status': status, 'Subject': $("#sscSubject").val(), 'Content': $("#sscContent").val() },
            function () { showBulkStatusChangeDialog(); });
            });
        }
        else {
            $("#sscDialogBoxNegative").click(function () { showStatusChangeDialog(); });
            $("#sscDialogBoxPositive").click(function () {
                AjaxHandler("UpdateStatusEmailTemplate", { 'Status': status, 'Subject': $("#sscSubject").val(), 'Content': $("#sscContent").val() },
            function () { showStatusChangeDialog(); });
            });
        }
    }
}

function showTransactionLogs() {
    var transLogText = "<div id=\"transactionLogsDiaglogBox\"><div class=\"dialogHeader\">" + le.TransactionLog + "</div>" + le.ThislogshowsthetransactionsbetweenyourekmPowershopstoreandyourpaymentgateway + " " + le.Itcanbeusedtoverifywhatdatahasbeenpassedfromyourgateway + "<br /><br />"+ le.PleasenotethisisonlyavailablewithcertaingatewaysInsomecasesthiscommunicationcantakeplaceafterthedateoforder + "<br /><br />" + le.Youcangethelponeachoftheitemsbyhoveringoverthembutifyourequirefurtherinformationpleasecontactyourpaymentgateway + "<br /><br />";
    transLogText += "<div id=\"transactionLogs\"><table cellspacing='0' cellpadding='1'>";
    for (var i = 0; i < CurrentOrderData.Order.TransactionLog.Entry.length; i++) {

        transLogText += "<tr><th colspan='3'>" + CurrentOrderData.Order.TransactionLog.Entry[i].Lines[1].DateTime + "</th></tr>";
    
        for (var n = 0; n < CurrentOrderData.Order.TransactionLog.Entry[i].Lines.length; n++) {
            transLogText += "<tr class='transactionLogsHasHover' title='" + CurrentOrderData.Order.TransactionLog.Entry[i].Lines[n].Info + "'>";
            transLogText += "<td class='transactionLogsHasHover'>" + CurrentOrderData.Order.TransactionLog.Entry[i].Lines[n].Key + "</td>";
            transLogText += "<td class='transactionLogsHasHover'>" + CurrentOrderData.Order.TransactionLog.Entry[i].Lines[n].Value + "</td>";
            transLogText += "<td class='transactionLogsHasHover'><div class='helpIcon' title='" + CurrentOrderData.Order.TransactionLog.Entry[i].Lines[n].Info + "'>?</div></td>";
            transLogText += "</tr>"
        }

        transLogText += "<tr><td colspan='3'>&nbsp;</td></tr>";
    }
    transLogText += "</table></div></div>";
    showDiaglogBox(transLogText, "Close");
}

function showDebugLogs(Data) {
    if (Data.d.Status != 1) {
        var transDebogText = "<div class=\"dialogHeader\">" + le.DebugInfo + "</div>";
        transDebogText += "<textarea cols='100' rows='35'>" + Data.d.Value + "</textarea>";
        showDiaglogBox(transDebogText, "Close");
    }
}


function fixCaseAddress() {
    $("#inputFirstname").val(toProperCase($("#inputFirstname").val())); 
    $("#inputLastname").val(toProperCase($("#inputLastname").val()));
    $("#inputCompany").val(toProperCase($("#inputCompany").val()));
    $("#inputAddress1").val(toProperCase($("#inputAddress1").val()));
    $("#inputAddress2").val(toProperCase($("#inputAddress2").val()));
    $("#inputTown").val(toProperCase($("#inputTown").val()));
    if ($("#inputCounty").val().length > 2) {
        $("#inputCounty").val(toProperCase($("#inputCounty").val()));
    }
    else {
        $("#inputCounty").val($("#inputCounty").val().toUpperCase());
    }

    var inputPostcode = $.trim($("#inputPostcode").val().toUpperCase());
    if (inputPostcode.length > 3 && $("#inputCountry").val() == "GB") {
        if (inputPostcode.substr(inputPostcode.length - 4,1) != " ") {
            inputPostcode = inputPostcode.substr(0, inputPostcode.length - 3) + " " + inputPostcode.substr(inputPostcode.length - 3,3);
        }
    }
    $("#inputPostcode").val(inputPostcode);

    $("#inputEmail").val($("#inputEmail").val().toLowerCase());

    $("#inputShippingFirstname").val(toProperCase($("#inputShippingFirstname").val()));
    $("#inputShippingLastname").val(toProperCase($("#inputShippingLastname").val()));
    $("#inputShippingCompany").val(toProperCase($("#inputShippingCompany").val()));
    $("#inputShippingAddress1").val(toProperCase($("#inputShippingAddress1").val()));
    $("#inputShippingAddress2").val(toProperCase($("#inputShippingAddress2").val()));
    $("#inputShippingTown").val(toProperCase($("#inputShippingTown").val()));
    $("#inputShippingTelephone").val(toProperCase($("#inputShippingTelephone").val()));
    if ($("#inputCounty").val().length > 2) {
        $("#inputShippingCounty").val(toProperCase($("#inputShippingCounty").val()));
    }
        else {
        $("#inputShippingCounty").val($("#inputShippingCounty").val().toUpperCase());
    }

    var inputShippingPostcode = $.trim($("#inputShippingPostcode").val().toUpperCase());
    if (inputShippingPostcode.length > 3 && $("#inputShippingCountry").val() == "GB") {
        if (inputShippingPostcode.substr(inputShippingPostcode.length - 4,1) != " ") {
            inputShippingPostcode = inputShippingPostcode.substr(0, inputShippingPostcode.length - 3) + " " + inputShippingPostcode.substr(inputShippingPostcode.length - 3,3);
        }
    }
    $("#inputShippingPostcode").val(inputShippingPostcode);
    saveOrder();
}

/* Print Dialogs*/
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

function showPrintDialog() {

    printDialogOpen = true;

    reSizePrintDialog();

    if (printSettingsData == null) {
        AjaxHandler("GetPrintSettings", "", OnSuccessGetPrintSettings)
    }
    else {
        redrawPrintDialog();
        $("#printDialogFancyLink").trigger('click');

        if (printSettingsData.DisplayState=="OPEN") {
            $("#printOptionSelectorLink").css({ "background-image": "url(./images/tango/greenMinus.png)"}); 
            $("#printOption").css({ 'height': 0 }).css({ 'height': 285 });
        }
    }

    function OnSuccessGetPrintSettings(date) {
        printSettingsData = date.d;
        redrawPrintDialog();
        $("#printDialogFancyLink").trigger('click');
        if (printSettingsData.DisplayState=="OPEN") {
            $("#printOptionSelectorLink").css({ "background-image": "url(./images/tango/greenMinus.png)"}); 
            $("#printOption").css({ 'height': 0 }).css({ 'height': 285 });
        }
    }
}

function reSizePrintDialog() {
    var windowHeight=$(window).height()

    if (windowHeight < 785) {
        $("#printDialogBoxButtonsBottom").hide();
        $("#printDialogBoxButtonsTop").show();
    }
    else
    {
        $("#printDialogBoxButtonsBottom").show();
        $("#printDialogBoxButtonsTop").hide();
    }

    if (windowHeight < 720) {
        $("#printDialogHelpText").hide();
    }
    else
    {
        $("#printDialogHelpText").show();
    }

    $.fancybox.resize();
}

function redrawPrintDialog() {

    if (bulkMode) {
        $("#SelectorPrintStyleHtml").hide();
        printSettingsData.PrintFormat = "[PDF]";
    }
    else {
        $("#SelectorPrintStyleHtml").show();
    }

    if (printSettingsData.PrintFormat == "[PDF]") {
        $("#SelectorPrintStyleHtml .printStyleSelectorOption").attr("src","images/option.png");
        $("#SelectorPrintStylePdf .printStyleSelectorOption").attr("src","images/optionSelected.png");
        
        $(".pdfOnlyOptions").show();
        $(".htmlOnlyOptions").hide();
    }
    if (printSettingsData.PrintFormat == "[HTML]") {
        $("#SelectorPrintStyleHtml .printStyleSelectorOption").attr("src","images/optionSelected.png");
        $("#SelectorPrintStylePdf .printStyleSelectorOption").attr("src","images/option.png");

        $(".htmlOnlyOptions").show();
        $(".pdfOnlyOptions").hide();
    }

    redrawPrintDialogPaperType();
    redrawPrintDialogSettings();
}

function redrawPrintDialogSettings() {

    if (printSettingsData.DisplayPaymentDetails == "TRUE") {
        $("#printoptionsPGNShow").attr("src","images/optionSelected.png");
        $("#printoptionsPGNHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsPGNShow").attr("src","images/option.png");
        $("#printoptionsPGNHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.DisplayGateway == "TRUE") {
        $("#printoptionsPGNaShow").attr("src","images/optionSelected.png");
        $("#printoptionsPGNaHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsPGNaShow").attr("src","images/option.png");
        $("#printoptionsPGNaHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.DisplayOrderNotes == "TRUE") {
        $("#printoptionsONShow").attr("src","images/optionSelected.png");
        $("#printoptionsONHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsONShow").attr("src","images/option.png");
        $("#printoptionsONHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.DisplayCustomFields == "TRUE") {
        $("#printoptionsCCFShow").attr("src","images/optionSelected.png");
        $("#printoptionsCCFHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsCCFShow").attr("src","images/option.png");
        $("#printoptionsCCFHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.DisplayPrices == "TRUE") {
        $("#printoptionsPShow").attr("src","images/optionSelected.png");
        $("#printoptionsPHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsPShow").attr("src","images/option.png");
        $("#printoptionsPHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.DisplayReturnSlip == "TRUE") {
        $("#printoptionsRAShow").attr("src","images/optionSelected.png");
        $("#printoptionsRAHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsRAShow").attr("src","images/option.png");
        $("#printoptionsRAHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.HideProductCodes == "TRUE") {
        $("#printoptionsPCShow").attr("src","images/optionSelected.png");
        $("#printoptionsPCHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsPCShow").attr("src","images/option.png");
        $("#printoptionsPCHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.FlipAddresses == "TRUE") {
        $("#printoptionsSLShow").attr("src","images/optionSelected.png");
        $("#printoptionsSLHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsSLShow").attr("src","images/option.png");
        $("#printoptionsSLHide").attr("src","images/optionSelected.png");
    }

    if (printSettingsData.DisplayDiscount == "TRUE") {
        $("#printoptionsDDsShow").attr("src","images/optionSelected.png");
        $("#printoptionsDDsHide").attr("src","images/option.png");
    }
    else {
        $("#printoptionsDDsShow").attr("src","images/option.png");
        $("#printoptionsDDsHide").attr("src","images/optionSelected.png");
    }
}

function redrawPrintDialogPaperType() {
    $(".printTypeIcon").css({ "background-image" : "url(./images/printTypeBorder.png)" });

    if (printSettingsData.PaperType == "STANDARD") {
        $(".printTypeStandard .printTypeIcon").css({ "background-image" : "url(./images/printTypeBorderSelected.png)" });
    }
    if (printSettingsData.PaperType == "SINGLE-LARGE") {
        $(".printTypeSingleLarge .printTypeIcon").css({ "background-image" : "url(./images/printTypeBorderSelected.png)" });
    }
    if (printSettingsData.PaperType == "LARGETWOPAGE") {
        $(".printTypeLargeTwoPage .printTypeIcon").css({ "background-image" : "url(./images/printTypeBorderSelected.png)" });
    }
    if (printSettingsData.PaperType == "SINGLE-SINGLESMALL") {
        $(".printTypeSingleSingleSmall .printTypeIcon").css({ "background-image" : "url(./images/printTypeBorderSelected.png)" });
    }
    if (printSettingsData.PaperType == "LARGE") {
        $(".printTypeLarge .printTypeIcon").css({ "background-image" : "url(./images/printTypeBorderSelected.png)" });
    }
    if (printSettingsData.PaperType == "SINGLESMALL") {
        $(".printTypeSingleSmall .printTypeIcon").css({ "background-image" : "url(./images/printTypeBorderSelected.png)" });
    }
    if (printSettingsData.PaperType == "DOUBLESMALL") {
        $(".printTypeDoubleSmall .printTypeIcon").css({ "background-image" : "url(./images/printTypeBorderSelected.png)" });
    }
}

function toggleOptions() {

    if (printSettingsData.DisplayState=="OPEN") {
        $("#printOptionSelectorLink").css({ "background-image": "url(./images/tango/greenPlus.png)"}); 
        $("#printOption").css({ 'height': 285 }).animate({ 'height': 0 }, 800, 'swing');
        printSettingsData.DisplayState="CLOSE";
    }
    else {
        $("#printOptionSelectorLink").css({ "background-image": "url(./images/tango/greenMinus.png)"}); 
        $("#printOption").css({ 'height': 0 }).animate({ 'height': 285 }, 800, 'swing');
        printSettingsData.DisplayState="OPEN";
    }
}

function savePrintSettings(doSynchronous) {
    debug('printSettingsNeedSaving:' + printSettingsNeedSaving)
    if (printSettingsNeedSaving) {
        var printSettings = {
            '__type': 'BLL.PrintSettings',
            'PrintFormat': printSettingsData.PrintFormat,
            'PaperType': printSettingsData.PaperType,
            'DisplayPaymentDetails': printSettingsData.DisplayPaymentDetails,
            'DisplayGateway': printSettingsData.DisplayGateway,
            'DisplayOrderNotes': printSettingsData.DisplayOrderNotes,
            'DisplayCustomFields': printSettingsData.DisplayCustomFields,
            'DisplayPrices': printSettingsData.DisplayPrices,
            'DisplayReturnSlip': printSettingsData.DisplayReturnSlip,
            'HideProductCodes': printSettingsData.HideProductCodes,
            'FlipAddresses': printSettingsData.FlipAddresses,
            'DisplayState': printSettingsData.DisplayState,
            'DisplayDiscount': printSettingsData.DisplayDiscount
        }
    
        if (doSynchronous == true) {
            // Dont use standard ajax function as need this one to be synchronous 
            $.ajax({
                'type': "POST",
                'contentType': "application/json; charset=utf-8",
                'url': "./AjaxHandler.asmx/SetPrintSettings",
                'data': "{ 'printSettings' : " + JSON.stringify(printSettings) + "}",
                'dataType': "json",
                'async': false
                });
        }
        else {
            AjaxHandler("SetPrintSettings", "{ 'printSettings' : " + JSON.stringify(printSettings) + "}");
        }
        printSettingsNeedSaving = false;
    }
}

function printOnClick() {
    savePrintSettings(true);
    $.fancybox.close();
    printDialogOpen = false;

    var returnUrl = "";
    if (printSettingsData.PrintFormat == "[PDF]") {
        var invoiceFormat = "NONE";
        if (printSettingsData.PaperType == "STANDARD") invoiceFormat = "STANDARD";
        if (printSettingsData.PaperType == "SINGLE-LARGE") invoiceFormat = "PACKAGINGSLIP-LARGE";
        if (printSettingsData.PaperType == "LARGETWOPAGE") invoiceFormat = "PACKAGINGSLIP-LARGETWOPAGE";
        if (printSettingsData.PaperType == "SINGLE-SINGLESMALL") invoiceFormat = "PACKAGINGSLIP-SMALL";
        if (printSettingsData.PaperType == "ONLY-LARGE") invoiceFormat = "PACKAGINGSLIP-ONLY-LARGE";
        if (printSettingsData.PaperType == "ONLY-SINGLESMALL") invoiceFormat = "PACKAGINGSLIP-ONLY-SMALL";

        if (invoiceFormat == "NONE") invoiceFormat = "STANDARD";

        var orderNumbers;
        if (bulkMode) {
            orderNumbers = SelectedOrders.toString();
            orderNumbers = "[" + orderNumbers.replace(/,/g, "], [") + "]";
        } else {
            orderNumbers = CurrentOrderData.Order.Id
        }
        if (invoiceFormat != "NONE") {
            returnUrl = 'https://' + SecureServerName + '/ekmps/shops/customers_vieworder_printerfriendly_pdf.asp?ordernumber=' + orderNumbers + '&invoiceformat=' + invoiceFormat + '&shop=' + shopName + '&Hash=' + hashCheck;
        }
    }

    if (printSettingsData.PrintFormat == "[HTML]") {
        var pageName = "NONE";
        if (printSettingsData.PaperType == "STANDARD") pageName = "customers_vieworder_printerfriendly_html.asp";
        if (printSettingsData.PaperType == "LARGE") pageName = "customers_vieworder_printerfriendly_alt.asp";
        if (printSettingsData.PaperType == "SINGLESMALL") pageName = "customers_vieworder_printerfriendly_alt.asp";
        if (printSettingsData.PaperType == "SINGLE-LARGE") pageName = "customers_vieworder_printerfriendly_singlepage.asp";
        if (printSettingsData.PaperType == "SINGLE-SINGLESMALL") pageName = "customers_vieworder_printerfriendly_singlepage.asp";

        if (pageName == "NONE") pageName = "STANDARD";

        if (pageName != "NONE") {
            var htmlPrintUrl = 'https://' + SecureServerName + '/ekmps/shops/' + pageName + '?ordernumber=' + CurrentOrderData.Order.OrderNumber + '&shop=' + shopName + '&Hash=' + hashCheck;
            htmlPrintUrl += '&DisplayPaymentDetails=' + printSettingsData.DisplayPaymentDetails;
            htmlPrintUrl += '&DisplayCustomFields=' + printSettingsData.DisplayCustomFields;
            htmlPrintUrl += '&DisplayPrices=' + printSettingsData.DisplayPrices;
            htmlPrintUrl += '&DisplayOrderNotes=' + printSettingsData.DisplayOrderNotes;
            htmlPrintUrl += '&DisplayReturnSlip=' + printSettingsData.DisplayReturnSlip;

            returnUrl = htmlPrintUrl;
        }
    }

    $(".printDialogPrintLink").attr({ 'href': returnUrl, 'target': '_blank' });
    return 'https://' + SecureServerName + '/ekmps/shops/customers_vieworder_printerfriendly_pdf.asp?ordernumber=' + orderNumbers + '&invoiceformat=' + invoiceFormat + '&shop=' + shopName + '&Hash=' + hashCheck;
}

function showPrintChangeHeader() {
    AjaxHandler("GetPrintSettingsHeader", "", OnSuccessGetPrintSettingsHeader);

    function OnSuccessGetPrintSettingsHeader(Data) {
        var changeHeaderText = "<div class=\"printSettingDialog dialogBox\"><div class=\"dialogHeader\">" + le.ChangeHeader + "</div><div class='dialogHelpText'>" + le.HereyoucanedittheheaderareaofyourPDFinvoicesYoucanuploadyourownimagelogoorentertextBydefaultyourcompanylogowillbeused + "</div>";
        var headerValue = Data.d.Value;
        
        if (headerValue.indexOf("[IMAGE]") == 0) {
            changeHeaderText += "<div id=\"printSettingImageDiv\">";
            changeHeaderText += "<img src='../" + shopName + "/images/system/" + headerValue.replace("[IMAGE]", "") + "' alt='Header Image' />";
            changeHeaderText += "</div>";
        }
        else {
            changeHeaderText += headerValue.replace("[TEXT]", "");
        }
        
        changeHeaderText += "<div class=\"dialogBoxButtons\">";

        changeHeaderText += "<a id='changeHeaderChange' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-pencil'></i>" + le.Edit + "</a>";

        changeHeaderText += "<a id='changeHeaderOK' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-arrow-left'></i>" + le.Back + "</a>";

        changeHeaderText += "</div><div class='clearBoth'></div></div>";

        $.fancybox(changeHeaderText);

        $("#changeHeaderOK").click(showPrintDialog);
        $("#changeHeaderChange").click(showPrintChangeHeaderImageOrText);

        function showPrintChangeHeaderImageOrText() {
            var changeHeaderText = "<div class=\"printSettingDialog dialogBox\"><div class=\"dialogHeader\">" + le.SelectHeaderStyle + "</div>";
            changeHeaderText += le.Selectifyoudliketouseanimageforyourheadersuchascompanylogoorjustplaintext;
            changeHeaderText += "<div class=\"dialogBoxButtons\">";

            changeHeaderText += "<a id='changeHeaderText' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-align-left'></i>" + le.UseText + "</a>";

            changeHeaderText += "<a id='changeHeaderImage' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-picture'></i>" + le.UseImage + "</a>";

            changeHeaderText += "</div>";
            changeHeaderText += "<div class='clearBoth'></div></div>";

            $.fancybox(changeHeaderText);

            $("#changeHeaderImage").click(showPrintChangeHeaderImage);
            $("#changeHeaderText").click(showPrintChangeHeaderText);
        }
        
        function showPrintChangeHeaderImage() {
            var changeHeaderText = "<div class=\"printSettingDialog dialogBox\"><div class=\"dialogHeader\">" + le.SelectImageToUse + "</div><div class='dialogHelpText'>" + le.PleaseselecttheimagefileyoudliketouploadYoucanonlyuploadJPGorGIFfiles + "</div>";
            changeHeaderText += "<form id=\"file_upload_form\" method=\"post\" action=\"./ajaxhandler.asmx/UpLoadImage\" enctype=\"multipart/form-data\" target=\"hiddenIframe\"><input id=\"printSettingDialogFile\" name=\"file\" type=\"file\" /><input name=\"fileUse\" type=\"hidden\" value=\"pdfHeaderImage\" />";
            changeHeaderText += "<br><iframe id=\"hiddenIframe\" name=\"hiddenIframe\" src=\"\" />";
            changeHeaderText += "<div class=\"dialogBoxButtons\">";

            changeHeaderText += "<a id='changeHeaderUpload' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive uploadForm'><i class='icon-upload'></i>" + le.Upload + "</a>";

            changeHeaderText += "<a id='changeHeaderCancel' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-arrow-left'></i>" + le.Back + "</a>";

            changeHeaderText += "</div></form>";
            changeHeaderText += "<div class='clearBoth'></div></div>"; 

            $.fancybox(changeHeaderText);

            var isDoingUpload = false;
            $("#changeHeaderUpload").click(function() { $("#file_upload_form").submit(); });
            $("#file_upload_form").submit(function() { $(".uploadForm").attr("disabled", "disabled"); isDoingUpload = true; });
            $("#changeHeaderCancel").click(showPrintChangeHeader);

            $("#hiddenIframe").load(function() { if (isDoingUpload == true) { showPrintChangeHeader() } });
        }

        function showPrintChangeHeaderText() {
            var headerText = headerValue.replace("[TEXT]", "");
            if (headerText.indexOf("[IMAGE]") == 0) {
                headerText = ""
            };

            var changeHeaderText = "<div class=\"printSettingDialog dialogBox\"><div class=\"dialogHeader\">" + le.EnterHeaderText + "</div><div class='dialogHelpText'>" + le.YoucanenteryourowntextinheresuchasyourcompanynameaddressorVATdetails + "</div>";
            changeHeaderText += "<textarea id=\"changeHeaderTextarea\" class=\"printSettingTextarea inputBox\">" + headerText + "</textarea>";
            changeHeaderText += "<div class=\"dialogBoxButtons\">";


            changeHeaderText += "<a id='changeHeaderSave' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive uploadForm'><i class='icon-save'></i>" + le.Save + "</a>";

            changeHeaderText += "<a id='changeHeaderCancel' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-arrow-left'></i>" + le.Back + "</a>";

            changeHeaderText += "</div>";
            changeHeaderText += "<div class='clearBoth'></div></div>";

            $.fancybox(changeHeaderText);

            $(".printSettingDialog .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
            $(".printSettingDialog .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

            $("#changeHeaderCancel").click(showPrintChangeHeader);
            $("#changeHeaderSave").click(function() { AjaxHandler("UpdatePrintHeaderText", '{ NewText: "' + cleanValue($("#changeHeaderTextarea").val()) + '" }', showPrintChangeHeader) });
        }           
    }
}

function showPrintChangeFooter() {
    AjaxHandler("GetPrintSettingsFooter", "", OnSuccessGetPrintSettingsFooter);

    function OnSuccessGetPrintSettingsFooter(Data) {
        var footerValue = Data.d.Value;
        var changeFooterText = "<div class=\"printSettingDialog dialogBox\"><div class=\"dialogHeader\">" + le.ChangeFooter + "</div>";
        changeFooterText += "<div class='dialogHelpText'>" + le.HereyoucaneditthefooterareaofthePDFversionsoftheordersYoucanputyourowntextinheresuchasyourcompanynameaddressVATdetailsetc + "</div>";
        changeFooterText += "<textarea id=\"changeFooterTextarea\" class=\"printSettingTextarea inputBox\">" + footerValue + "</textarea>";
        changeFooterText += "<div class=\"dialogBoxButtons\">";

        changeFooterText += "<a id='changeFooterSave' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive uploadForm'><i class='icon-save'></i>" + le.Save + "</a>";

        changeFooterText += "<a id='changeFooterCancel' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-arrow-left'></i>" + le.Back + "</a>";

        changeFooterText += "</div>";
        changeFooterText += "<div class='clearBoth'></div></div>";
        $.fancybox(changeFooterText);

        $(".printSettingDialog .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
        $(".printSettingDialog .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

        $("#changeFooterCancel").click(showPrintDialog);
        $("#changeFooterSave").click(function() { AjaxHandler("UpdatePrintFooterText", '{ NewText: "' + cleanValue($("#changeFooterTextarea").val()) + '" }', showPrintDialog) });
    }
}

function showPrintChangeText() {
    AjaxHandler("GetPrintSettingsTextElements", "", OnSuccessGetPrintSettingsTextElements);

    function OnSuccessGetPrintSettingsTextElements(Data) {
        var textElements = Data.d.Value;
        var nameValueList = textElements.split("&");
        var changeTextText = "<div class=\"printSettingDialogText dialogBox\"><div class=\"dialogHeader\">" + le.ChangeTextElements + "</div><div>";
        changeTextText += "<div class='dialogHelpText'>" + le.HereyoucanedittextelementsontheorderformtoyourlikingLeaveblankifyouwishtousethedefaultsPleasebeawarethateachtextelementhaslimitedspaceandenteringavaluethatistoolongcouldcausetexttooverlaporpushtheformattingout + "</div>";
        changeTextText += "<div>"
        for (var i = 0; i < nameValueList.length; i++) {
            var ElementName = decodeURIComponent(nameValueList[i].split("=")[0]).replace(/\+/g," ");
            var ElementValue = decodeURIComponent(nameValueList[i].split("=")[1]).replace(/\+/g, " ");
            changeTextText += "<div class='printSettingsTextElements'><div>" + ElementName + ":</div><input type='text' class='textElements inputBox' name='" + ElementName + "' value='" + ElementValue + "' /></div>";
        }

        changeTextText += "</div><div class=\"dialogBoxButtons clearBoth\">";

        changeTextText += "<a id='changeTextSave' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive uploadForm'><i class='icon-save'></i>" + le.Save + "</a>";

        changeTextText += "<a id='changeTextCancel' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-arrow-left'></i>" + le.Back + "</a>";

        changeTextText += "</div>";
        changeTextText += "<div class='clearBoth'></div></div>";
        $.fancybox(changeTextText);

        $("#changeTextCancel").click(showPrintDialog);
        $("#changeTextSave").click(function() {
            var textElementsForm = $(".textElements");
            var nvList = "";
            for (var i = 0; i < textElementsForm.length; i++) {
                nvList += encodeURIComponent(textElementsForm[i].name) + "=" + encodeURIComponent(textElementsForm[i].value) + "&";
            }
            if (nvList.substring(nvList.length - 1) == "&") { nvList = nvList.substring(0,nvList.length - 1) }
            AjaxHandler("UpdatePrintTextElements", '{ NewText: "' + nvList + '" }', showPrintDialog);
        });
    }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

function redrawOrderListHeaders() {
    $(".orderHeaderOrderByIcon").remove();

    $("#itemListHeaderDate").click(function() { CurrentOrderBy = "Date"; loadOrderList(true); });
    $("#itemListHeaderName").click(function() { CurrentOrderBy = "Name"; loadOrderList(true); });
    $("#itemListHeaderValue").click(function() { CurrentOrderBy = "Price"; loadOrderList(true); });
    $("#itemListHeaderStatus").click(function() { CurrentOrderBy = "Status"; loadOrderList(true); });
    $("#itemListHeaderOrderNumber").click(function() { CurrentOrderBy = "OrderNumber"; loadOrderList(true); });

    if (CurrentOrderBy == "Date") 
    {
        $("#itemListHeaderDate").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9650;</div>");
        $("#itemListHeaderDate").unbind();
        $("#itemListHeaderDate").click(function() { CurrentOrderBy = "Date Descending"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "Name") 
    {
        $("#itemListHeaderName").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9650;</div>");
        $("#itemListHeaderName").unbind();
        $("#itemListHeaderName").click(function() { CurrentOrderBy = "Name Descending"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "Price") 
    {
        $("#itemListHeaderValue").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9650;</div>");
        $("#itemListHeaderValue").unbind();
        $("#itemListHeaderValue").click(function() { CurrentOrderBy = "Price Descending"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "Status") 
    {
        $("#itemListHeaderStatus").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9650;</div>");
        $("#itemListHeaderStatus").unbind();
        $("#itemListHeaderStatus").click(function() { CurrentOrderBy = "Status Descending"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "OrderNumber") 
    {
        $("#itemListHeaderOrderNumber").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9650;</div>");
        $("#itemListHeaderOrderNumber").unbind();
        $("#itemListHeaderOrderNumber").click(function() { CurrentOrderBy = "OrderNumber Descending"; loadOrderList(true); });
    }



    if (CurrentOrderBy == "Date Descending") 
    {
        $("#itemListHeaderDate").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9660;</div>");
        $("#itemListHeaderDate").unbind();
        $("#itemListHeaderDate").click(function() { CurrentOrderBy = "Date"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "Name Descending") 
    {
        $("#itemListHeaderName").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9660;</div>");
        $("#itemListHeaderName").unbind();
        $("#itemListHeaderName").click(function() { CurrentOrderBy = "Name"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "Price Descending") 
    {
        $("#itemListHeaderValue").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9660;</div>");
        $("#itemListHeaderValue").unbind();
        $("#itemListHeaderValue").click(function() { CurrentOrderBy = "Price"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "Status Descending") 
    {
        $("#itemListHeaderStatus").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9660;</div>");
        $("#itemListHeaderStatus").unbind();
        $("#itemListHeaderStatus").click(function() { CurrentOrderBy = "Status"; loadOrderList(true); });
    }
    if (CurrentOrderBy == "OrderNumber Descending") 
    {
        $("#itemListHeaderOrderNumber").append("<div class='orderHeaderOrderByIcon oHOBIright'>&#9660;</div>");
        $("#itemListHeaderOrderNumber").unbind();
        $("#itemListHeaderOrderNumber").click(function() { CurrentOrderBy = "OrderNumber"; loadOrderList(true); });
    }
}

function loadOrderList(newList) {
    if (!loadingOrderList)
    {
        statusSelectorRemove();
        loadingOrderList = true;
        if (newList) {
            redrawOrderListHeaders();
            Orders = [];
            SelectedOrders = [];
            SectionOrders = [];
            countOfHeaderRows = 0;
            RecordBreakPointID = 0
            orderListHeader = "";
            tempheaderId = "";
            altRowTraker = 0;
            collapseAllHeadersToggle = true;

            upDateSummary();

            $("#itemListInner").empty();
            $("#itemListInner").append("<div id='itemListLoading'></div>");
        }

        $("#itemListLoading").html("<div class='side-load'>" + le.Loading + "</div>");

        var topWindowsHtml = "";
        var topWindowsTitle = "";

        if (searchAdvanced) {
            var searchForFirstName = $("#searchForFirstName").val();
            var searchForLastName = $("#searchForLastName").val();
            var searchForCompanyName = $("#searchForCompanyName").val();
            var searchForEmail = $("#searchForEmail").val();
            var searchForTelephone = $("#searchForTelephone").val();
            var searchForOrderNumber = $("#searchForOrderNumber").val();
            var searchForProductID = $("#searchForProductID").val();
            var searchForProductName = $("#searchForProductName").val();
            var dateRange = $("#dateSelector").val();
            var statusFilter = $("#filterStatusAdvanced").val();

            $("#searchFor").val(toProperCase(jQuery.trim(searchForFirstName + " " + searchForLastName + " " + searchForCompanyName + " " + searchForEmail + " " + searchForTelephone + " " + searchForOrderNumber + " " + searchForProductID + " " + searchForProductName + " " + dateRange + " " + statusFilter)));

            AjaxHandler("GetOrderListAdvanced", '{ searchForFirstName: "' + searchForFirstName + '", searchForLastName: "' + searchForLastName + '", searchForCompanyName: "' + searchForCompanyName + '", searchForEmail: "' + searchForEmail + '", searchForTelephone: "' + searchForTelephone + '", searchForOrderNumber: "' + searchForOrderNumber + '", searchForProductID: "' + searchForProductID + '", searchForProductName: "' + searchForProductName + '", DateRange: "' + dateRange + '", OrderBy: "' + CurrentOrderBy + '", StatusFilter: "' + statusFilter + '", RecordBreakPointID: ' + RecordBreakPointID + ', NumberOfRecords: ' + RecordSetSize + ' }', OnSuccessGetOrderList);
        }
        else {
            var search = $("#searchFor").val();
            var statusFilter = "";
            var highestIndexOfStatus = -1;
            var regExpPending = new RegExp(le.Pending,"ig");
            var secondArray = statusArray.toString().replace(/Pending/ig, le.Pending.toLowerCase()).split(",");
                      
            secondArray.sort(function(a,b) {return b.length - a.length });
           
            for (var i = 0; i < secondArray.length; i++) {
                var indexOfStatus = search.toLowerCase().lastIndexOf(secondArray[i].toLowerCase());
                if (indexOfStatus > -1) {
                    if ((secondArray[i].length > statusFilter.length)) {
                        statusFilter = secondArray[i];
                        highestIndexOfStatus = indexOfStatus;
                    }
                }
            }
            for (var i = 0; i < secondArray.length; i++) {
                var regExp = new RegExp(secondArray[i],"ig");
                search = jQuery.trim(search.replace(regExp, ""));
            }
            $("#searchFor").val(jQuery.trim(jQuery.trim(search) + " " + jQuery.trim(toProperCase(statusFilter))));
            
            AjaxHandler("GetOrderList", '{ SearchFor: "' + cleanValue(search) + '", OrderBy: "' + CurrentOrderBy + '", StatusFilter: "' + statusFilter.replace(regExpPending, "Pending") + '", RecordBreakPointID: ' + RecordBreakPointID + ', NumberOfRecords: ' + RecordSetSize + ' }', OnSuccessGetOrderList);
        }
    }
    
    function OnSuccessGetOrderList(data)
    {
        if (data.d.TotalRecords == null || data.d.TotalRecords == 0) {
            $("#itemListLoading").html(le.NoOrdersFound);
            CurrentTotalRecords = 0;
            loadingOrderList = false;
            CurrentDisplayOrderId = -1;

            $("#orderDetailsPane1").css({ 'left': 0 }).animate({ 'left': 727 }, 600, 'swing', function() { $("#orderDetailsPane1").css({ 'display': 'none' }) });
            $("#noOrderSelectedMessageInner").fadeIn();
        }
        else {
            $("#noOrderSelectedMessageInner").fadeOut();
            $("#itemListLoading").remove();

            var selectAllCheckboxVal = $("#selectAllCheckbox").attr("checked");
            var altRowInsert = "";
            for(var i = 0; i < data.d.Items.length; i++){
                if (Math.round(altRowTraker / 2) == (altRowTraker / 2)) { altRowInsert = " orderListAltRow"; } else { altRowInsert = ""; }

                var transEkmStatus = "";
                var transEkmStatusTitle = "";
                if (data.d.Items[i].EkmStatus == 'FAILED') {
                    transEkmStatus = le.PaymentFailed;
                }else if (data.d.Items[i].EkmStatus == 'SUCCESS'){
                    transEkmStatus =  le.PaymentSuccess;
                }else{
                   transEkmStatus = le.PaymentUnknown;
                }
                transEkmStatusTitle = transEkmStatus;

                var tmpStatusDetails = "";
                if (data.d.Items[i].OrderType != null && data.d.Items[i].OrderType != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.OrderType + " : </strong>" + toProperCase(data.d.Items[i].OrderType) + "<br />";
                    transEkmStatusTitle = transEkmStatusTitle + le.OrderType + " : " + toProperCase(data.d.Items[i].OrderType) + "\n\r";
                }

                if (data.d.Items[i].TransStatus != null && data.d.Items[i].TransStatus != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.TransactionStatus + " : </strong>" + data.d.Items[i].TransStatus;
                    transEkmStatusTitle = transEkmStatusTitle + le.TransactionStatus + " : " + data.d.Items[i].TransStatus + "\n\r";
                }
                if (data.d.Items[i].TransStatusMsg != null && data.d.Items[i].TransStatusMsg != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.TransactionMessage + " : </strong>" + data.d.Items[i].TransStatusMsg;
                    transEkmStatusTitle = transEkmStatusTitle + le.TransactionMessage + " : " + data.d.Items[i].TransStatusMsg + "\n\r";
                }
                if (data.d.Items[i].TransId != null && data.d.Items[i].TransId != '') {
                    tmpStatusDetails = tmpStatusDetails + "<br /><strong>" + le.TransactionId + " : </strong>" + data.d.Items[i].TransId;
                    transEkmStatusTitle = transEkmStatusTitle + le.TransactionId + " : " + data.d.Items[i].TransId + "\n\r";
                }

                altRowTraker++;
                if (data.d.ContextDataType == "date" || data.d.ContextDataType == "ordernumber") {
                    tempheaderId = data.d.Items[i].HeaderData.toLowerCase().replace(/[\s|.|&|;|/]/g, "");
                    if (orderListHeader != data.d.Items[i].HeaderData) {
                        orderListHeader = data.d.Items[i].HeaderData;
                        $("#itemListInner").append("<div onclick=\"showHideItems('" + tempheaderId + "')\"><div class='orderListHeader'><div id='Image"+tempheaderId+"' class='orderListHeaderImage'>&#9660;</div>" + orderListHeader + "</div></div><div class='orderListContent' id='Div" + tempheaderId + "' class='divOrderListItems'></div>");
                        countOfHeaderRows++;
                        if (!collapseAllHeadersToggle) showHideItems(tempheaderId);
                    }
                    $("#Div" + tempheaderId).append("<div id='orderList" + data.d.Items[i].OrderId + "' class='orderListItem " + altRowInsert + " " + tempheaderId + "Group'><div class='orderListSelector hideWhenSmall' onclick='selectOrders(" + data.d.Items[i].OrderId + ")'><input type='checkbox' class='orderListCheckBox' value='" + data.d.Items[i].OrderId + "' /></div><div class='orderListStatus'><div title='" + lePending(data.d.Items[i].OrderStatus) + "' class='orderList" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'>" + lePending(data.d.Items[i].OrderStatus).substring(0, 1) + "</div></div><div class='itemListSelectOrderDiv' onclick='selectOrder(" + data.d.Items[i].OrderId + ")'><div class='orderListStatus2 hideWhenSmall orderListStatus2" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'><div title='" + data.d.Items[i].OrderStatus + "'>" + lePending(data.d.Items[i].OrderStatus) + "</div></div><div class='orderListEkmStatus'><div class='uifw-tooltip tt-yellow smalldot " + data.d.Items[i].EkmStatus.replace(/\'/g, "&#39;") + "' title='" + transEkmStatusTitle.replace(/\'/g, "&#39;") + "' data-title='" + transEkmStatus.replace(/\'/g, "&#39;") + "' data-desc='" + tmpStatusDetails.replace(/\'/g, "&#39;") + "'></div></div><div class='orderListNumber'>" + data.d.Items[i].OrderId + "</div><div class='orderListCustomerName' title='" + data.d.Items[i].CustomerName + "'>" + data.d.Items[i].CustomerName + "</div><div class='orderListOrderDate hideWhenSmall'>" + data.d.Items[i].OrderDate + "</div><div class='orderListValue'>" + currencySymbolBeforeAfter(data.d.Items[i].Price) + "</div></div></div>");
                    SectionOrders.push(data.d.Items[i].OrderId);
                }
                
                if (data.d.ContextDataType == "price") {
                    tempValue = currencySymbolBeforeAfter(significantFigures(data.d.Items[i].HeaderData,2)) + " - " + currencySymbolBeforeAfter(significantFiguresUpper(data.d.Items[i].HeaderData, 2));
                    tempheaderId = (significantFigures(data.d.Items[i].HeaderData,2) + "-" + significantFiguresUpper(data.d.Items[i].HeaderData, 2)).toLowerCase().replace(/[\s|.|&|;|/|£]/g, "");
                    if (orderListHeader != tempValue) {
                        orderListHeader = tempValue;
                        $("#itemListInner").append("<div onclick=\"showHideItems('" + tempheaderId + "')\"><div class='orderListHeader'><div id='Image"+tempheaderId+"' class='orderListHeaderImage'>&#9660;</div>" + orderListHeader + "</div></div><div class='orderListContent' id='Div" + tempheaderId + "'></div>");
                        countOfHeaderRows++;
                    }
                    $("#Div" + tempheaderId).append("<div id='orderList" + data.d.Items[i].OrderId + "' class='orderListItem " + altRowInsert + " " + tempheaderId + "Group'><div class='orderListSelector hideWhenSmall' onclick='selectOrders(" + data.d.Items[i].OrderId + ")'><input type='checkbox' class='orderListCheckBox' value='" + data.d.Items[i].OrderId + "' /></div><div class='orderListStatus'><div title='" + lePending(data.d.Items[i].OrderStatus) + "' class='orderList" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'>" + lePending(data.d.Items[i].OrderStatus).substring(0, 1) + "</div></div><div class='itemListSelectOrderDiv' onclick='selectOrder(" + data.d.Items[i].OrderId + ")'><div class='orderListStatus2 hideWhenSmall orderListStatus2" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'><div title='" + data.d.Items[i].OrderStatus + "'>" + lePending(data.d.Items[i].OrderStatus) + "</div></div><div class='orderListEkmStatus'><div class='uifw-tooltip tt-yellow smalldot " + data.d.Items[i].EkmStatus.replace(/\'/g, "&#39;") + "' title='" + transEkmStatusTitle.replace(/\'/g, "&#39;") + "' data-title='" + transEkmStatus.replace(/\'/g, "&#39;") + "' data-desc='" + tmpStatusDetails.replace(/\'/g, "&#39;") + "'></div></div><div class='orderListNumber'>" + data.d.Items[i].OrderId + "</div><div class='orderListCustomerName' title='" + data.d.Items[i].CustomerName + "'>" + data.d.Items[i].CustomerName + "</div><div class='orderListOrderDate'>" + data.d.Items[i].OrderDate + "</div><div class='orderListValue hideWhenSmall'>" + currencySymbolBeforeAfter(data.d.Items[i].Price) + "</div></div></div>");
                    SectionOrders.push(data.d.Items[i].OrderId);
                }
                
                if (data.d.ContextDataType == "name") {
                    tempheaderId = data.d.Items[i].HeaderData.toLowerCase().replace(/[\s|.|&|;|/]/g, "");
                    if (orderListHeader.toLowerCase() != data.d.Items[i].HeaderData.toLowerCase()){
                        orderListHeader = data.d.Items[i].HeaderData;
                        $("#itemListInner").append("<div onclick=\"showHideItems('" + tempheaderId + "')\"><div class='orderListHeader'><div id='Image"+tempheaderId+"' class='orderListHeaderImage'>&#9660;</div>" + orderListHeader + "</div></div><div class='orderListContent' id='Div" + tempheaderId + "'></div>");
                        countOfHeaderRows++;
                    }
                    $("#Div" + tempheaderId).append("<div id='orderList" + data.d.Items[i].OrderId + "' class='orderListItem " + altRowInsert + " " + tempheaderId + "Group'><div class='orderListSelector hideWhenSmall' onclick='selectOrders(" + data.d.Items[i].OrderId + ")'><input type='checkbox' class='orderListCheckBox' value='" + data.d.Items[i].OrderId + "' /></div><div class='orderListStatus'><div title='" + lePending(data.d.Items[i].OrderStatus) + "' class='orderList" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'>" + lePending(data.d.Items[i].OrderStatus).substring(0, 1) + "</div></div><div class='itemListSelectOrderDiv' onclick='selectOrder(" + data.d.Items[i].OrderId + ")'><div class='orderListStatus2 hideWhenSmall orderListStatus2" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'><div title='" + data.d.Items[i].OrderStatus + "'>" + lePending(data.d.Items[i].OrderStatus) + "</div></div><div class='orderListEkmStatus'><div class='uifw-tooltip tt-yellow smalldot " + data.d.Items[i].EkmStatus.replace(/\'/g, "&#39;") + "' title='" + transEkmStatusTitle.replace(/\'/g, "&#39;") + "' data-title='" + transEkmStatus.replace(/\'/g, "&#39;") + "' data-desc='" + tmpStatusDetails.replace(/\'/g, "&#39;") + "'></div></div><div class='orderListNumber'>" + data.d.Items[i].OrderId + "</div><div class='orderListCustomerName hideWhenSmall' title='" + data.d.Items[i].CustomerName + "'>" + data.d.Items[i].CustomerName + "</div><div class='orderListOrderDate'>" + data.d.Items[i].OrderDate + "</div><div class='orderListValue'>" + currencySymbolBeforeAfter(data.d.Items[i].Price) + "</div></div></div>");
                    SectionOrders.push(data.d.Items[i].OrderId);
                }

                if (data.d.ContextDataType == "status") {
                    tempheaderId = data.d.Items[i].HeaderData.toLowerCase().replace(/[\s|.|&|;|/]/g, "");
                    if (orderListHeader != data.d.Items[i].HeaderData) {
                        orderListHeader = data.d.Items[i].HeaderData;
                        $("#itemListInner").append("<div onclick=\"showHideItems('" + tempheaderId + "')\"><div class='orderListHeader'><div id='Image"+tempheaderId+"' class='orderListHeaderImage'>&#9660;</div>" + orderListHeader + "</div></div><div class='orderListContent' id='Div" + tempheaderId + "'></div>");
                        countOfHeaderRows++;
                    }
                    $("#Div" + tempheaderId).append("<div id='orderList" + data.d.Items[i].OrderId + "' class='orderListItem " + altRowInsert + " " + tempheaderId + "Group'><div class='orderListSelector hideWhenSmall' onclick='selectOrders(" + data.d.Items[i].OrderId + ")'><input type='checkbox' class='orderListCheckBox' value='" + data.d.Items[i].OrderId + "' /></div><div class='orderListStatus'><div title='" + lePending(data.d.Items[i].OrderStatus) + "' class='orderList" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'>" + lePending(data.d.Items[i].OrderStatus).substring(0, 1) + "</div></div><div class='itemListSelectOrderDiv' onclick='selectOrder(" + data.d.Items[i].OrderId + ")'><div class='orderListStatus2 hideWhenSmall orderListStatus2" + data.d.Items[i].OrderStatus.toLowerCase().replace(/\s|\./g, "") + "'><div title='" + data.d.Items[i].OrderStatus + "'>" + lePending(data.d.Items[i].OrderStatus) + "</div></div><div class='orderListEkmStatus'><div class='uifw-tooltip tt-yellow smalldot " + data.d.Items[i].EkmStatus.replace(/\'/g, "&#39;") + "' title='" + transEkmStatusTitle.replace(/\'/g, "&#39;") + "' data-title='" + transEkmStatus.replace(/\'/g, "&#39;") + "' data-desc='" + tmpStatusDetails.replace(/\'/g, "&#39;") + "'></div></div><div class='orderListNumber'>" + data.d.Items[i].OrderId + "</div><div class='orderListCustomerName hideWhenSmall' title='" + data.d.Items[i].CustomerName + "'>" + data.d.Items[i].CustomerName + "</div><div class='orderListOrderDate'>" + data.d.Items[i].OrderDate + "</div><div class='orderListValue'>" + currencySymbolBeforeAfter(data.d.Items[i].Price) + "</div></div></div>");
                    SectionOrders.push(data.d.Items[i].OrderId);
                }
                
                if (selectAllCheckboxVal && bulkMode) {
                    SelectedOrders.push(data.d.Items[i].OrderId);
                    $("#orderList" + data.d.Items[i].OrderId).addClass("orderListSelected");
                    $("#orderList" + data.d.Items[i].OrderId + " .orderListCheckBox").attr("checked", "checked");
                }
                Orders.push(data.d.Items[i]);
                RecordBreakPointID = data.d.Items[i].OrderId;

                jQuery('#orderList' + data.d.Items[i].OrderId + ' .uifw-tooltip').uifwTooltipPopup2({
                    'titleAttribute': 'data-title',
                    'descriptionAttribute': 'data-desc',
                    'theme': 'yellow',
                    'direction': 'right',
                    'offsetY': 0,
                    'offsetX': 0,
                    'width': 'auto',
                    'maxWidth': 280,
                    'minWidth': 200,
                    'minHeight': 45
                });
            }

            upDateSummary();
            
            if (newList) {
                if (passedOrderID != -1) {
                    if (passedOrderID == 'new') {
                        addNewOrder();
                    } else {
                        selectOrder(passedOrderID);
                    }
                    passedOrderID = -1;
                } else {
                    if (!bulkMode) selectOrder(data.d.Items[0].OrderId);
                }
            }
                 
            CurrentTotalRecords = data.d.TotalRecords;
            $("#itemListInner").append("<div id='itemListLoading'></div>");

            // initialise the scroll bar, if not all the records are loaded set trigger to load more when scrollPos is near the bottom
            if (CurrentTotalRecords != Orders.length) {
                initialiseTheScrollBar();
            }
            else {
                $('#itemList').unbind();
            }
            
            loadingOrderList = false;

            if ($('#itemListInner').height() < $('#itemList').height()) {  
                $("#itemListHeaderScollbarPadding").hide();
            } else {
                $("#itemListHeaderScollbarPadding").show();
            }
        }
    }
}

function lePending(theStausToCheck) {
    var theStausToCheckString = new String(theStausToCheck);
    if (theStausToCheck.toUpperCase() == "PENDING") {
        return le.Pending;
    } else {
        return theStausToCheck;
    }
}

function currencySymbolBeforeAfter(passedValue) {
    if (priceSymbolLayout != "PRICE-SYMBOL") {
        return currencyHtmlSymbol + passedValue;
    }
    else {
        return passedValue + currencyHtmlSymbol;
    }
}

function upDateSummary() {
    var totalPrice = 0;
    for (i = 0; i <= Orders.length - 1; i++) {
        if ($.inArray(Orders[i].OrderId, SelectedOrders) != -1) {
            totalPrice += leNumber(Orders[i].Price);
        }
    }
    $("#bulkModeSummary").html("<div style='text-align:center;'><span class='orders-selected-text'> " + le.OrdersSelected + ":</span> " + SelectedOrders.length + " <span class='orders-selected-text'>" + le.TotalValue + ": </span>" + currencySymbolBeforeAfter(leFormat(totalPrice)) + "</div>")

    function s(theValue) {
        if (theValue != 1) {
            return "s";
        }
        else{ 
            return "";
        }
    }
}

function showHideItems(elementName) {
    if ($("#Div" + elementName + ":first").is(":hidden")) {
        $("#Div" + elementName).slideDown(initialiseTheScrollBar);
        $("#Image" + elementName).html("&#9660;");
    }
    else {
        $("#Div" + elementName).slideUp(initialiseTheScrollBar);
        $("#Image" + elementName).html("&#9658;");
    }
}

function initialiseTheScrollBar() {

    $('#itemList').unbind();
    $('#itemList').bind('scroll', function(e) {
        var loadBreakPoint = ($('#itemListInner').innerHeight() - $('#itemList').innerHeight() -500);
        if (loadBreakPoint < $("#itemList").scrollTop()) {
            loadOrderList(false);
        }
    });

    if ($('#itemListInner').height() < $('#itemList').height()) {
        clearTimeout(timeOutID);
        timeOutID = setTimeout("loadOrderList(false);", 500);
        $("#itemListHeaderScollbarPadding").hide();
    }
    else
    {
        $("#itemListHeaderScollbarPadding").show();
        clearTimeout(timeOutID);
    }
}

var collapseAllHeadersToggle = true;
function collapseAllHeaders() {
    collapseAllHeadersToggle = !collapseAllHeadersToggle;
    var elementList = [];
      
    $(".divOrderListItems").each(function(index) {
        elementList.push($(this).attr("id").replace(/Div/, ""));
    });

    doNextAnimation();

    function doNextAnimation() {
        var nextAnimation = elementList.shift();
        if (nextAnimation) {
            if (collapseAllHeadersToggle) {
                $("#Div" + nextAnimation).slideDown(doNextAnimation);
                $("#Image" + nextAnimation).html("&#9660;");
            }
            else {
                $("#Div" + nextAnimation).slideUp(doNextAnimation);
                $("#Image" + nextAnimation).html("&#9658;");
            }
        }
        else
        {
            initialiseTheScrollBar();
        }
    }
}

function significantFigures(number, places) {
    number = number.replace(",", "");
    if (isNaN(number)) return 0;
    tempNumber = number;
    if (tempNumber.indexOf(".")) tempNumber = tempNumber.substring(0,tempNumber.indexOf("."));
    if (tempNumber > 0) {
        newNumber = tempNumber.substring(0, places);
        for (var i = places; i < tempNumber.length; i++) {
            newNumber = newNumber.concat('0');
        }
        return newNumber;
    }
    else { return 0; }
}

function significantFiguresUpper(number, places) {
    number = number.replace(",", "");
    if (isNaN(number)) return 1;
    tempNumber = number;
    if (tempNumber.indexOf(".")) tempNumber = tempNumber.substring(0,tempNumber.indexOf("."));
    if (tempNumber > 0) {
        newNumber = tempNumber.substring(0,places);
        newNumber++;
        newNumber = newNumber.toString();
        for(var i = places; i < tempNumber.length; i++){
            newNumber = newNumber.concat('0');
        }
        return newNumber;
    }
    else { return 1; }
}

//function roundToTwoPlaces(number) {
//    if (typeof(number) == "string") { number = number.replace(",", "") };
//    if (isNaN(number)) return 0;
//    tempNumber = new Number(number);
//    var tempNumber2 = tempNumber.toFixed(2).toString()
//    if (tempNumber2.length > 6) tempNumber2 = tempNumber2.substring(0,tempNumber2.length - 6) +  "," + tempNumber2.substring(tempNumber2.length - 6);

//    return tempNumber2;
//}

function selectOrders(Id) {
    var indexOfId = $.inArray(parseInt(Id), SelectedOrders);
        
    if (indexOfId == -1) {
        $("#orderList" + Id).addClass("orderListSelected");
        $("#orderList" + Id +  " .orderListCheckBox").attr("checked", "checked");
        SelectedOrders.push(Id);
        CurrentOrderIndex = -1;
    }
    else {
        $("#orderList" + Id).removeClass("orderListSelected");
        $("#orderList" + Id +  " .orderListCheckBox").attr("checked", "");
        SelectedOrders.splice(indexOfId, 1);
    }

    upDateSummary();
    return false;
}

function selectOrder(Id) {
    if (bulkMode) {
        swopToFullToSmallList();
        loadOrderData(Id);
    }
    else {
        if (editMode == true) {
            showDiaglogBox("<div class=\"dialogHeader\">" + le.UnsavedChanges + "</div>" + le.Wouldyouliketosavethesechangesnow, "YesNo", function() {
                saveOrder();
                loadOrderData(Id);
            }, function() { loadOrderData(Id); });
        }
        else {
            loadOrderData(Id);
        }
    }
}

function loadLoyaltyPointDataData(Id) {
    AjaxHandler("GetLoyaltyPoint", '{ OrderID: "' + Id + '" }', OnSuccessGetLoyaltyPoint);

    function OnSuccessGetLoyaltyPoint(data) {
        CurrentOrderData.Order.LoyaltyPoints = data.d.LoyaltyPoints;
        CurrentOrderData.Order.LoyaltyPointsStatus = data.d.LoyaltyPointsStatus;

        UpdateLoyaltyPoint();
    }
}

function UpdateLoyaltyPoint() {
    if (shopUsesLoyaltyPoints) {
        $(".LoyaltyPointsShowHide").show();
        var LoyaltyPointstext = "<span class='lpvalue'>" + leFormat(CurrentOrderData.Order.LoyaltyPoints,0) + "</span>"
        LoyaltyPointstext += "<span class='lplabel'>";
        if (CurrentOrderData.Order.LoyaltyPointsStatus == "U")
        {
            LoyaltyPointstext += " " + le.Unaccounted;
        }
        if (CurrentOrderData.Order.LoyaltyPointsStatus == "A")
        {
            LoyaltyPointstext += " " + le.Awarded;
        }
        if (CurrentOrderData.Order.LoyaltyPointsStatus == "R")
        {
            LoyaltyPointstext += " " + le.Refunded;
        }
        LoyaltyPointstext += "</span>";
        $("#LabelLoyaltyPoints").html(LoyaltyPointstext);
    } 
    else {
        $(".LoyaltyPointsShowHide").hide();
    }
}

function loadOrderData(Id) {
    //If id is undefined just show a bounce anim to show you cannot change order to new id.
    statusSelectorRemove();
    if (Id == undefined || Id == -1) {
        $("#orderDetailsPane1").animate({ 'left': 100 }, 200).animate({ 'left': 0 }, 200);    }
    else {
        var newOrderIndex = -1;
        for (i = 0; i <= Orders.length - 1; i++) {
            if (Orders[i].OrderId == Id) {
                newOrderIndex = i;
                i = Orders.length;
            }
        }
        
        //Sort out animation direction
        if (newOrderIndex == CurrentOrderIndex) {
            outAffect = { 'left': 0 };
            outStartPos = { 'left': 0 };

            inAffect = { 'left': 0 };
            inStartPos = { 'left': 0, 'display': 'block' };
        }
        else {
            if (newOrderIndex < CurrentOrderIndex) {
                outAffect = { 'left': 727 };
                outStartPos = { 'left': 0 };

                inAffect = { 'left': 0 };
                inStartPos = { 'left': -727, 'display': 'block' };
            }
            else {
                outAffect = { 'left': -727 };
                outStartPos = { 'left': 0 };

                inAffect = { 'left': 0 };
                inStartPos = { 'left': 727, 'display': 'block' };
            }
        }

        $("#orderDetailsPane1").css(outStartPos).animate(outAffect, 600, 'swing');
        $(".orderListItem").removeClass("orderListSelected");

        AjaxHandler("GetOrder", '{ OrderId: "' + Id + '" }', OnSuccessGetOrder);
    }

    function OnSuccessGetOrder(data) {

        CurrentOrderData = data.d;
        CurrentDisplayOrderId = CurrentOrderData.Order.Id;
        CurrentDisplayCustomerId = CurrentOrderData.Customer.Id;
        CurrentDisplayCustomerIP = CurrentOrderData.Order.IpAddress;
        CurrentDisplayCustomerIPBlock = CurrentOrderData.Order.Block;

        SelectedOrders = [CurrentOrderData.Order.Id];
        selectedDeliveryMethod = 0;
        customerId = CurrentDisplayCustomerId;

        $("#noOrderSelectedMessageInner").fadeOut();

        switchingMode = false;

        if (CurrentOrderIndex == 999989) {
            editMode = true;

            $("#customerInput").show();
            $("#customerLabels").hide();
            
            $("#shippingInput").show();
            $("#shippingLabels").hide();

            displayOrderDetailsEdit();

            $("#courierPigeonBox").hide();

            $("#saveOrder").show();
            $("#cancelSaveOrder").show();
            $("#editOrder").hide();
            $("#DeleteOrder").show();
            $("#PrintButton").hide();
            $("#totalsRecalculateButton").hide();
        }
        else {
            editMode = false;
            $("#customerInput").hide();
            $("#customerLabels").show();

            $("#shippingInput").hide();
            $("#shippingLabels").show();

            displayOrderDetails();

            $("#courierPigeonBox").show();

            $("#saveOrder").hide();
            $("#cancelSaveOrder").hide();
            $("#editOrder").show();
            $("#DeleteOrder").hide();
            $("#PrintButton").show();
            $("#totalsRecalculateButton").show();

            $("#pinpointpopout .ip").html(CurrentDisplayCustomerIP);

            //On initial load of order hide/display verify buttons
            if (CurrentOrderData.Customer.BillingAddressVerified == "1")
                $(".verifyadd.billing").addClass("verified").attr("title","Address Verified");
            else
                $(".verifyadd.billing").removeClass("verified").attr("title", "Verify Address");

            if (CurrentOrderData.Order.ShippingAddressVerified == "1")
                $(".verifyadd.shipping").addClass("verified").attr("title", "Address Verified");
            else
                $(".verifyadd.shipping").removeClass("verified").attr("title", "Verify Address");


            if (!CurrentDisplayCustomerIP) {
                $('#pinpoint').hide();
            } else {
                $('#pinpoint').show();
            }
            //Show/Hide Block/Unblock button and inject blockid into link.
            if (CurrentDisplayCustomerIPBlock == "") {
                $("#blockvisitor").show().attr("data-ip",CurrentDisplayCustomerIP);
                $("#unblockvisitor").hide().attr("data-ip", CurrentDisplayCustomerIP);
            } else {
                $("#unblockvisitor").show().attr("data-ip",CurrentDisplayCustomerIP);
                $("#blockvisitor").hide().attr("data-ip", CurrentDisplayCustomerIP);
            }
        }

        CurrentOrderIndex = newOrderIndex

        $("#orderList" + CurrentDisplayOrderId).addClass("orderListSelected");
        $("#LabelOrderNumber").html(CurrentOrderData.Order.OrderNumber);

        $("#DropDownListOrderTypeTempStatus").remove();
        $("#SelectOrderType").val(CurrentOrderData.Order.OrderType.toUpperCase());
        if (CurrentOrderData.Order.OrderType.toUpperCase() != $("#SelectOrderType").val()) {
            if (CurrentOrderData.Order.OrderType.toUpperCase() == "PAYPALIPN") {
                $("#SelectOrderType").prepend("<option id='DropDownListOrderTypeTempStatus' value='PAYPALIPN'>Paypal IPN</option>");
            } 
            else if (CurrentOrderData.Order.OrderType.toUpperCase() == "BARCLAYCARDEPDQ") {
                $("#SelectOrderType").prepend("<option id='DropDownListOrderTypeTempStatus' value='BARCLAYCARDEPDQ'>Barclaycard ePDQ</option>");
            }
             else {
                $("#SelectOrderType").prepend("<option id='DropDownListOrderTypeTempStatus' value='" + CurrentOrderData.Order.OrderType.toUpperCase() + "'>" + toProperCase(CurrentOrderData.Order.OrderType) + "</option>");
            }
            $("#SelectOrderType").val(CurrentOrderData.Order.OrderType.toUpperCase());
        }

        $("#LabelOrderDate").html(CurrentOrderData.Order.OrderDate.replace(/\s/g, "&nbsp;"));

        $("#DropDownListOrderStatusTempStatus").remove();
        $("#DropDownListOrderStatus").val(CurrentOrderData.Order.OrderStatus.toUpperCase());
        if (CurrentOrderData.Order.OrderStatus.toUpperCase() != $("#DropDownListOrderStatus").val()) {
            $("#DropDownListOrderStatus").prepend("<option id='DropDownListOrderStatusTempStatus' value='" + CurrentOrderData.Order.OrderStatus.toUpperCase() + "'>" + toProperCase(lePending(CurrentOrderData.Order.OrderStatus)) + "</option>");
            $("#DropDownListOrderStatus").val(CurrentOrderData.Order.OrderStatus.toUpperCase());
        }

        var newOrderStatusClass = CurrentOrderData.Order.OrderStatus.replace(/\s|\./g, "").toLowerCase();
        $("#orderList" + CurrentDisplayOrderId + " .orderListStatus > div").removeClass().addClass("orderList" + newOrderStatusClass).html(lePending(CurrentOrderData.Order.OrderStatus).substring(0,1)).attr('title',lePending(CurrentOrderData.Order.OrderStatus));
        $("#orderList" + CurrentDisplayOrderId + " .orderListStatus2 > div").removeClass().addClass("orderListStatus2" + newOrderStatusClass).html(toProperCase(lePending(CurrentOrderData.Order.OrderStatus))).attr('title',lePending(CurrentOrderData.Order.OrderStatus));
        $("#orderList" + CurrentDisplayOrderId + " .orderListCustomerName").html(CurrentOrderData.Customer.Firstname + " " + CurrentOrderData.Customer.Lastname);
        $("#orderList" + CurrentDisplayOrderId + " .orderListValue").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalCost)));
        $("#DropDownListOrderStatus").removeClass().addClass("inputBox orderListStatus2" + newOrderStatusClass);
        
        if (CurrentOrderData.Customer.Id == 0) {
            $("#customerViewButton").hide();
        }
        else {
            $("#customerViewButton").show();
        }

        $("#inputFirstname").val(CurrentOrderData.Customer.Firstname);
        $("#inputLastname").val(CurrentOrderData.Customer.Lastname);
        $("#inputCompany").val(CurrentOrderData.Customer.Company);
        $("#inputAddress1").val(CurrentOrderData.Customer.Address1);
        $("#inputAddress2").val(CurrentOrderData.Customer.Address2);
        $("#inputTown").val(CurrentOrderData.Customer.Town);
        $("#inputCounty").val(CurrentOrderData.Customer.County);
        if (CurrentOrderData.Customer.Country == "" || CurrentOrderData.Customer.Country == null) {
            $("#inputCountry").val(ShopCountryCode);
            $("#LabelCountry").html("");
        }
        else {
            $("#inputCountry").val(CurrentOrderData.Customer.Country);
            $("#LabelCountry").html(document.getElementById("inputCountry").options[document.getElementById("inputCountry").selectedIndex].text);
        }

        $("#inputPostcode").val(CurrentOrderData.Customer.Postcode);

        $("#inputEmail").val(CurrentOrderData.Customer.Email);
        $("#inputTelephone").val(CurrentOrderData.Customer.Telephone);
        $("#inputFax").val(CurrentOrderData.Customer.Fax);

        $("#LabelCustomerName").html(CurrentOrderData.Customer.Firstname + " " + CurrentOrderData.Customer.Lastname);
        $("#LabelCompany").html(CurrentOrderData.Customer.Company);
        $("#LabelAddress1").html(CurrentOrderData.Customer.Address1);
        $("#LabelAddress2").html(CurrentOrderData.Customer.Address2);
        $("#LabelTown").html(CurrentOrderData.Customer.Town);
        $("#LabelCounty").html(CurrentOrderData.Customer.County);

        $("#LabelPostcode").html(CurrentOrderData.Customer.Postcode);

        $("#LabelEmail").html(CurrentOrderData.Customer.Email);
        $("#LabelTelephone").html(CurrentOrderData.Customer.Telephone);
        $("#LabelFax").html(CurrentOrderData.Customer.Fax);

        if (CurrentOrderData.Order.ShippingCountry == "" || CurrentOrderData.Order.ShippingCountry == null)
            $("#inputShippingCountry").val(ShopCountryCode);
        else
            $("#inputShippingCountry").val(CurrentOrderData.Order.ShippingCountry);

        if (CurrentOrderData.NumberOfOrders > 1)
            $("#customerTable").addClass("repeatCustomerIcon");
        else
            $("#customerTable").removeClass("repeatCustomerIcon");

        if (CurrentOrderData.Order.DifferentShippingAddress != false) {
            $("#inputShippingFirstname").val(CurrentOrderData.Order.ShippingFirstname);
            $("#inputShippingLastname").val(CurrentOrderData.Order.ShippingLastname);
            $("#inputShippingCompany").val(CurrentOrderData.Order.ShippingCompany);
            $("#inputShippingAddress1").val(CurrentOrderData.Order.ShippingAddress1);
            $("#inputShippingAddress2").val(CurrentOrderData.Order.ShippingAddress2);
            $("#inputShippingTown").val(CurrentOrderData.Order.ShippingTown);
            $("#inputShippingCounty").val(CurrentOrderData.Order.ShippingCounty);

            $("#LabelShippingCountry").html(document.getElementById("inputShippingCountry").options[document.getElementById("inputShippingCountry").selectedIndex].text);
            $("#inputShippingPostcode").val(CurrentOrderData.Order.ShippingPostcode);
            $("#inputShippingTelephone").val(CurrentOrderData.Order.ShippingTelephone);

            $("#LabelShippingCustomerName").html(CurrentOrderData.Order.ShippingFirstname + " " + CurrentOrderData.Order.ShippingLastname);
            $("#LabelShippingCompany").html(CurrentOrderData.Order.ShippingCompany);
            $("#LabelShippingAddress1").html(CurrentOrderData.Order.ShippingAddress1);
            $("#LabelShippingAddress2").html(CurrentOrderData.Order.ShippingAddress2);
            $("#LabelShippingTown").html(CurrentOrderData.Order.ShippingTown);
            $("#LabelShippingCounty").html(CurrentOrderData.Order.ShippingCounty);
            $("#LabelShippingPostcode").html(CurrentOrderData.Order.ShippingPostcode);
            $("#LabelShippingTelephone").html(CurrentOrderData.Order.ShippingTelephone);

            $("#sameAsBillingMessage").hide();
            $("#shippingLabelTable").show();
        }
        else {
            $("#inputShippingFirstname").val("");
            $("#inputShippingLastname").val("");
            $("#inputShippingCompany").val("");
            $("#inputShippingAddress1").val("");
            $("#inputShippingAddress2").val("");
            $("#inputShippingTown").val("");
            $("#inputShippingCounty").val("");
            $("#inputShippingPostcode").val("");
            $("#inputShippingTelephone").val("");

            $("#LabelShippingCustomerName").html("");
            $("#LabelShippingCompany").html("");
            $("#LabelShippingAddress1").html("");
            $("#LabelShippingAddress2").html("");
            $("#LabelShippingTown").html("");
            $("#LabelShippingCounty").html("");
            $("#LabelShippingCountry").html("");
            $("#LabelShippingPostcode").html("");
            $("#LabelShippingTelephone").html("");

            $("#sameAsBillingMessage").show();
            $("#shippingLabelTable").hide();

            ShippingClipboard = "";
        }

        if (CurrentOrderData.Order.AbandonedCartLink != null && CurrentOrderData.Order.OrderStatus == "Pending") {
            $("#AbandonedCart-Link").show();
            $("#AbandonedCartlink").val(CurrentOrderData.Order.AbandonedCartLink);
            $("#AbandonedCart-Saved").hide();
        } else {
            $("#AbandonedCart-Link").hide();
            if (CurrentOrderData.Order.ReturnedToOrder && $.trim(CurrentOrderData.Order.OrderType) != "" && CurrentOrderData.Order.EkmStatus != 'FAILED') {
                $("#AbandonedCart-Saved").show();

                $("#AbandonedCart-value").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalCost)));
            } else {
                $("#AbandonedCart-Saved").hide();
            }
        }
	

        if (CurrentOrderData.Order.CourierPigeonReference == 0) {
            $("#CourierPigeon-GetQuote").show();
            $("#CourierPigeon-ViewDetails").hide();
        } else {
            $("#CourierPigeon-GetQuote").hide();
            $("#CourierPigeon-ViewDetails").show();
            $("#CPViewDetails").attr({ "data-cpReference": CurrentOrderData.Order.CourierPigeonReference });
        }


        if (CurrentOrderData.PaymentDetails == "<div class=\"PaymentDetailsOutput\"></div>") {
            $("#PaymentDetails").hide();
        }
        else {
            $("#PaymentDetails").show();
            $("#LabelPaymentDetails").html(CurrentOrderData.PaymentDetails);
        }

        if (CurrentOrderData.Order.CustomFields != "") {
            $("#CustomFields").show();
            $("#LabelCustomFields").html("<table>" + CurrentOrderData.Order.CustomFields.replace(/\[ekm:chs\]/g, currencyHtmlSymbol) + "</table>");
        }
        else {
            $("#CustomFields").hide();
        }

        $("#LabelSubTotal").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.SubTotal)));

        $(".LabelDeliveryMethods").html(CurrentOrderData.Order.DeliveryMethod);        
              
        $("#LabelDelivery").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalDelivery)));
        $("#LabelTax").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalTax)));
        $("#LabelTotal").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalCost)));

        $("#recalculatingImg").hide();

        $("#TextBoxOrderNotes").val(CurrentOrderData.Order.CustomerFacingNotes);
        $("#TextBoxInternalNotes").val(CurrentOrderData.Order.Notes);

        UpdateLoyaltyPoint();

        if (CurrentOrderData.Order.TransactionLog.hasLogs == false) {
            $("#transLog").hide();
        }
        else {
            $("#transLog").show();
        }

        $("#orderDetailsPane1").stop().css(inStartPos).animate(inAffect, 600, 'swing',
            function () {
                if (!(iframeSrc == undefined)) { $("#iframeThatNeedsSrc").attr('src', iframeSrc); }
                $(".fadeButton").stop(true).css({ 'opacity': 0 }).animate({ 'opacity': 1 }).delay(200).animate({ 'opacity': 0 },2000);
            });
        $("#orderDetails").scrollTop(0);


        jQuery('.PaymentDetailsOutput > .uifw-tooltip').uifwTooltipPopup2({
			'titleAttribute': 'data-title',
			'descriptionAttribute': 'data-desc',
			'theme': 'yellow',
            'direction': 'left',
            'offsetY': -15,
            'offsetX': 15,
            'width': 'auto',
            'maxWidth': 280,
            'minWidth': 200,
            'minHeight': 45
        });

    }
}

function updatePaymentDetails(orderData) {
    debug("updatePaymentDetails");
    if (orderData.TransactionLog) CurrentOrderData.TransactionLog = orderData.TransactionLog;
    if (orderData.PaymentDetails) CurrentOrderData.PaymentDetails = orderData.PaymentDetails;

    if (CurrentOrderData.PaymentDetails == "<div class=\"PaymentDetailsOutput\"></div>") {
        $("#PaymentDetails").hide();
    }
    else {
        $("#PaymentDetails").show();
        $("#LabelPaymentDetails").html(CurrentOrderData.PaymentDetails);
    }
}

function displayOrderDetails() {

    $(".ordersItemInputProductId").unbind();
    
    var altRowInsert = "";
    var orderItemsOutput = "<table class='orderDetails' cellpadding='0' cellspacing='0'><tr><th align='left' class='rightBorder'>" + le.ID + "</th><th align='left' class='rightBorder leftBorder'>" + le.ProductDetails + "</th><th align='center' class='rightBorder leftBorder'>" + le.Price + "</th><th align='center' class='rightBorder leftBorder'>" + le.Qty + "</th><th align='center' class='leftBorder'>" + le.Total + "</th></tr>";
    for (i = 0; i <= CurrentOrderData.OrderItems.length - 1; i++) {
        if (Math.round(i / 2) == (i / 2)) {altRowInsert = ""} else {altRowInsert = " altRow"}

        var tempPrice = leNumber(CurrentOrderData.OrderItems[i].Price);
        var tempTitle = CurrentOrderData.OrderItems[i].Details;
        if (CurrentOrderData.OrderItems[i].Stock != null && CurrentOrderData.OrderItems[i].Stock != "") {
            tempTitle += " (" + CurrentOrderData.OrderItems[i].Stock + " " + le.InStock + ")";
        }

        orderItemsOutput += "<td width='60px' class=\"id-product-code" + altRowInsert + "\">" + CurrentOrderData.OrderItems[i].ProductCode + "</td>";

        var imageRegex = /.{8}\-.{4}\-.{4}\-.{4}\-.{12}/;

        var options = "";
        var opts = CurrentOrderData.OrderItems[i].Options.split("<br />");

        $.each(opts, function (index, value) {

            if (imageRegex.test(value)) {
                newValues = value.split(":");
                (newValues[1]) ? newValue = $.trim(newValues[1]) : newValue = "";
                dateToDelete = $.trim(newValues[0]).substring(0, 10);
                newValue = "<a class='optionImageLink' href='#' data-dtd='" + dateToDelete + "' data-link='/ekmps/shops/" + shopName + "/resources/Options/" + newValue + "'>" + newValue.replace(imageRegex, '') + "</a>";
                options += $.trim(newValues[0]).substring(10) + ": " + newValue + "<br />";
            } else {
                options += value + "<br />";
            }
        });

        if (options == "") {
            options = CurrentOrderData.OrderItems[i].Options;
        }

        if (CurrentOrderData.OrderItems[i].ParentProductID < 1 || CurrentOrderData.OrderItems[i].ParentProductID == undefined) {
            orderItemsOutput += "<td class=\"" + altRowInsert + "\" title=\"" + tempTitle + "\">" + CurrentOrderData.OrderItems[i].Details + "<br><div class=\"ProductDetailsOptions\">" + options + "</div></td>";
        }
        else
        {
            orderItemsOutput += "<td class=\"" + altRowInsert + "\" title=\"" + tempTitle + "\"><a class='productLink' href='../" + shopName + "/index.asp?function=DISPLAYPRODUCT&productid=" + CurrentOrderData.OrderItems[i].ParentProductID + "' target='_blank'>" + CurrentOrderData.OrderItems[i].Details + "</a><br><div class=\"ProductDetailsOptions\">" + options + "</div></td>";
        }


        orderItemsOutput += "<td width='60px' class=\"numberFieldRight " + altRowInsert + "\">" + currencySymbolBeforeAfter(leFormat(tempPrice)) + "</td>";
        orderItemsOutput += "<td width='40px' class=\"qtyField" + altRowInsert + "\">" + CurrentOrderData.OrderItems[i].Quantity + "</td>";
        orderItemsOutput += "<td width='70px' class=\"numberField total-product-value" + altRowInsert + "\">" + currencySymbolBeforeAfter(leFormat(CurrentOrderData.OrderItems[i].TotalPrice)) + "</td></tr>";
    } 
   
    orderItemsOutput += "</table>";

    $("#orderItems").html(orderItemsOutput);

    if (CurrentOrderData.Order.Discounts != null && (CurrentOrderData.Order.Discounts != "" || (CurrentOrderData.Order.DiscountsTotal != 0 && CurrentOrderData.Order.DiscountsTotal != "0,00"))) {
        $("#discounts").show();
        $("#discountsLabels").show();
        $("#discountsInput").hide();
        $("#labelDiscounts").html(CurrentOrderData.Order.Discounts);

        var lineCount = CurrentOrderData.Order.Discounts.split("<BR>").length;
        if (lineCount < 3) lineCount = 3;
        $("#inputDiscounts").attr("rows", lineCount);
        
        $("#labelDiscountsTotal").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.DiscountsTotal)));
        $("#inputDiscountsTotal").val(CurrentOrderData.Order.DiscountsTotal);
    }
    else {
        $("#discounts").hide();
    }


    if (BillingVerified == false) {
        $(".verifyadd.billing").removeClass("verified").attr("title","Verify Address");
    }
    else {
        $(".verifyadd.billing").addClass("verified").attr("title","Address Verified");
    }

    if (ShippingVerified == false) {
        $(".verifyadd.shipping").removeClass("verified").attr("title", "Verify Address");
    }
    else {
        $(".verifyadd.shipping").addClass("verified").attr("title", "Address Verified");
    }

    setupFileUpload();
}

function displayOrderDetailsEdit() {
    $(".ordersItemInputProductId").unbind();

    var altRowInsert = "";
    var orderItemsOutput = "<table class='orderDetails' cellpadding='0' cellspacing='0'><tr><th align='left' class='rightBorder'>" + le.ID + "</th><th align='left' class='rightBorder leftBorder'>" + le.ProductDetails + "</th><th align='center' class='rightBorder leftBorder'>" + le.Price + "</th><th align='center' class='rightBorder leftBorder'>" + le.Qty + "</th><th align='right' class='leftBorder'>" + le.Total + "</th></tr>";
    for (i = 0; i <= CurrentOrderData.OrderItems.length - 1; i++) {
        if (Math.round(i / 2) == (i / 2)) { altRowInsert = "" } else { altRowInsert = " altRow" }

        CurrentOrderData.OrderItems[i].Details = CurrentOrderData.OrderItems[i].Details.replace(/\"/g,"&quot;")

        orderItemsOutput += "<tr class=\"orderItemsInput\">";
        orderItemsOutput += "<td valign='top' class=\"numberField id-col-edit" + altRowInsert + "\"><span id=\"ordersItemInputID" + CurrentOrderData.OrderItems[i].OrderItemID + "\">" + CurrentOrderData.OrderItems[i].ProductCode + "</span><br/><div class='orderItemsDeleteButton button' onclick='confirmDeleteOrderItem(" + CurrentOrderData.OrderItems[i].OrderItemID + ")'>" + le.Delete + "</div></td>";
        orderItemsOutput += "<td class=\"" + altRowInsert + "\"><input type=\"hidden\" id=\"ordersItemInputProductId" + CurrentOrderData.OrderItems[i].OrderItemID + "\" value=\"" + CurrentOrderData.OrderItems[i].ProductId + "\" /><input type=\"hidden\" id=\"ordersItemInputStock" + CurrentOrderData.OrderItems[i].OrderItemID + "\" value=\"" + CurrentOrderData.OrderItems[i].Stock + "\" /><input type=\"text\" id=\"ordersItemInputDetails" + CurrentOrderData.OrderItems[i].OrderItemID + "\" class=\"ordersItemInputDetails inputBox\" value=\"" + CurrentOrderData.OrderItems[i].Details + "\" /><div class=\"" + altRowInsert + " ordersItemInputProductId add-product-search\" onclick='showProductSelector(" + CurrentOrderData.OrderItems[i].OrderItemID + ")'><img src='./images/tango/edit-find.png' alt='" + le.SelectfromProductList + "' title='" + le.SelectfromProductList + "' /></div><br /><textarea id=\"ordersItemInputOptions" + CurrentOrderData.OrderItems[i].OrderItemID + "\" class=\"ordersItemInputDetailsTextArea inputBox\" >" + CurrentOrderData.OrderItems[i].Options.replace(/<br>/i, "\n") + "</textarea></td>";
        orderItemsOutput += "<td valign='top' class=\"" + altRowInsert + "\"><input type=\"text\" id=\"ordersItemInputPrice" + CurrentOrderData.OrderItems[i].OrderItemID + "\" class=\"ordersItemInput inputBox\" value=\"" + leFormat(CurrentOrderData.OrderItems[i].Price) + "\" /></td>";
        orderItemsOutput += "<td valign='top' class=\"" + altRowInsert + "\"><input type=\"text\" id=\"ordersItemInputQuantity" + CurrentOrderData.OrderItems[i].OrderItemID + "\" class=\"ordersItemInput inputBox qty-edit-input\" value=\"" + CurrentOrderData.OrderItems[i].Quantity + "\" /></td>";
        orderItemsOutput += "<td valign='top' id='tot-price-edit' class=\"" + altRowInsert + "\">" + CurrentOrderData.OrderItems[i].TotalPrice + "</td>";
        orderItemsOutput += "</tr>";
    }

    if (altRowInsert == "") { altRowInsert = " altRow" } else { altRowInsert = "" }
    orderItemsOutput += "<tr class=\"orderItemsInput\">";
    orderItemsOutput += "<td valign='top' class=\"numberField id-col-edit" + altRowInsert + "\" id=\"ordersItemInputID0\">0</td>";
    orderItemsOutput += "<td valign='top' class=\"" + altRowInsert + "\"><input type=\"hidden\" id=\"ordersItemInputProductId0\" value=\"0\" /><input type=\"hidden\" id=\"ordersItemInputStock0\" value=\"\" /><input type=\"text\" id=\"ordersItemInputDetails0\" class=\"ordersItemInputDetails inputBox\" value=\"\" /><div class=\"" + altRowInsert + " ordersItemInputProductId add-product-search\" onclick='showProductSelector(0)'><img src='./images/tango/edit-find.png' alt='" + le.SelectfromProductList + "' title='" + le.SelectfromProductList + "' /></div><br /><textarea id=\"ordersItemInputOptions0\" class=\"ordersItemInputDetailsTextArea inputBox\" ></textarea></td>";
    orderItemsOutput += "<td valign='top' class=\"" + altRowInsert + "\"><input type=\"text\" id=\"ordersItemInputPrice0\" class=\"ordersItemInput inputBox\" value=\"\" /></td>";
    orderItemsOutput += "<td valign='top' class=\"" + altRowInsert + "\"><input type=\"text\" id=\"ordersItemInputQuantity0\" class=\"ordersItemInput inputBox qty-edit-input\" value=\"\" /></td>";
    orderItemsOutput += "<td class=\"" + altRowInsert + "\"><div id='orderItemsAddButton' class='button'>" + le.Add + "</div></td>";
    orderItemsOutput += "</tr>";

    orderItemsOutput += "</table>";

    $("#orderItems").html(orderItemsOutput);
    $("#orderItemsAddButton").click(function() { addOrderItem(false); } );

    $("#orderItems .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
    $("#orderItems .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

    $("#discounts").show();
    $("#discountsLabels").hide();
    $("#discountsInput").show();

    if (CurrentOrderData.Order.Discounts != null)
        $("#inputDiscounts").val(CurrentOrderData.Order.Discounts);
    else
        $("#inputDiscounts").val("");

    $("#inputDiscountsTotal").val(CurrentOrderData.Order.DiscountsTotal);

    $(".orderItemsInput").show();   
}

function putOrderItemValuesIntoObject() {
    for (i = 0; i <= CurrentOrderData.OrderItems.length - 1; i++) {
        var tempDetails = $("#ordersItemInputDetails" + CurrentOrderData.OrderItems[i].OrderItemID).val().replace(/\"/g,"&quot;");

        var tempPrice = leNumber($("#ordersItemInputPrice" + CurrentOrderData.OrderItems[i].OrderItemID).val());
        var origPrice = leNumber(CurrentOrderData.OrderItems[i].Price);

        if (tempDetails != CurrentOrderData.OrderItems[i].Details || tempPrice != origPrice) {
            CurrentOrderData.OrderItems[i].ProductId = 0;
            CurrentOrderData.OrderItems[i].ProductCode = "";           
        }
        else {
            CurrentOrderData.OrderItems[i].ProductId = $("#ordersItemInputProductId" + CurrentOrderData.OrderItems[i].OrderItemID).val();
            CurrentOrderData.OrderItems[i].ProductCode = $("#ordersItemInputID" + CurrentOrderData.OrderItems[i].OrderItemID).html();
        }
        CurrentOrderData.OrderItems[i].Details = tempDetails;
        CurrentOrderData.OrderItems[i].Options = $("#ordersItemInputOptions" + CurrentOrderData.OrderItems[i].OrderItemID).val().replace("\"","&quot;").replace("\n","<br>");
        CurrentOrderData.OrderItems[i].Price = leFormat(tempPrice);
        CurrentOrderData.OrderItems[i].Quantity = $("#ordersItemInputQuantity" + CurrentOrderData.OrderItems[i].OrderItemID).val();
        CurrentOrderData.OrderItems[i].TotalPrice = leFormat(tempPrice * CurrentOrderData.OrderItems[i].Quantity);
        CurrentOrderData.OrderItems[i].Stock = $("#ordersItemInputStock" + CurrentOrderData.OrderItems[i].OrderItemID).val();
    }
    CurrentOrderData.Order.Discounts = $("#inputDiscounts").val();
    CurrentOrderData.Order.Discounts.replace(/\n/,"<br />");
    CurrentOrderData.Order.DiscountsTotal = $("#inputDiscountsTotal").val();
}

function addOrderItem(doRecalc) {
    putOrderItemValuesIntoObject();
    var prodCodeToUse = "";
    if ($("#ordersItemInputID0").html() != 0) {
        prodCodeToUse = $("#ordersItemInputID0").html();
    }

    if (($("#ordersItemInputPrice0").val() != lastAddedPrice) || ($("#ordersItemInputDetails0").val() != lastAddedName))
    {
        $("#ordersItemInputProductId0").val("0");
        prodCodeToUse = "0";
    }

    newOrderItem = {
        '__type': 'DAL.OrderItemObjectLiteOP',
        'OrderItemID': '0',
        'ProductId': $("#ordersItemInputProductId0").val(),
        'ProductCode': prodCodeToUse,
        'Details': $("#ordersItemInputDetails0").val().replace("\"","&quot;"),
        'Options': $("#ordersItemInputOptions0").val().replace("\"","&quot;"),
        'Price': $("#ordersItemInputPrice0").val(),
        'Quantity': $("#ordersItemInputQuantity0").val(),
        'TotalPrice': ($("#ordersItemInputPrice0").val() * $("#ordersItemInputQuantity0").val()).toFixed(2),
        'Stock': $("#ordersItemInputStock0").val()
    }
 

    AjaxHandler("AddOrderItem", "{ 'OrderNumber': '" + CurrentOrderData.Order.OrderNumber + "', 'OrderItem': " + JSON.stringify(newOrderItem) + "}", onSuccessAddOrderItem);
    
    function onSuccessAddOrderItem(data){
        newOrderItem.OrderItemID = data.d;
        CurrentOrderData.OrderItems.push(newOrderItem);
        if (editMode) { displayOrderDetailsEdit(); } else { displayOrderDetails(); }
        if (doRecalc) RecalculateTotals();
    }
}

function confirmDeleteOrderItem(OrderItemID) {
    var indexToShow = null;
    for (var i = 0; i < CurrentOrderData.OrderItems.length; i++) {
        if (OrderItemID == CurrentOrderData.OrderItems[i].OrderItemID) { indexToShow = i; }
    }
    if (indexToShow != null) {
        showDiaglogBox("<div class=\"dialogHeader\">" + le.DeleteConfirmation + "</div>" + le.Areyousureyouwishtoremoveitem + " <span class='item-name-delete'>" + CurrentOrderData.OrderItems[indexToShow].Details + "</span> " + le.fromthisorder, "YesNo", function() { deleteOrderItem(OrderItemID); });
    }
}

function deleteOrderItem(OrderItemID) {
    AjaxHandler("DeleteOrderItem", "{ 'OrderItemID': " + OrderItemID + "}");
    var indexToBeRemoved = null;
    for(var i = 0; i < CurrentOrderData.OrderItems.length; i++){
        if (OrderItemID == CurrentOrderData.OrderItems[i].OrderItemID) {indexToBeRemoved = i;}
    }
    if (indexToBeRemoved != null) {CurrentOrderData.OrderItems.splice(indexToBeRemoved, 1);}
    displayOrderDetailsEdit();
}

function orderNotesShow() {
    $("#orderNotes").show();
    $("#internalNotes").hide();
    $("#orderNotesTab1").css({ 'background' : '#fff' });
    $("#orderNotesTab2").css({ 'background' : '#fff url(./images/orderListHeaderBackGround.gif) bottom repeat-x' });

    AjaxHandler("SetOrderNotesDefault", "{ 'SetTo': 'customerfacing'}");
}

function internalNotesShow() {
    $("#orderNotes").hide();
    $("#internalNotes").show();
    $("#orderNotesTab1").css({ 'background' : '#fff url(./images/orderListHeaderBackGround.gif) bottom repeat-x' });
    $("#orderNotesTab2").css({ 'background' : '#fff' });

    AjaxHandler("SetOrderNotesDefault", "{ 'SetTo': 'internal'}");
}

function addNewOrder() {
    AjaxHandler("AddOrder", "", onSuccessAddNewOrder);

    function onSuccessAddNewOrder(data) {
        $("#noOrderSelectedMessageInner").fadeOut();
        CurrentOrderIndex = 999989; /* Set CurrentOrderIndex very high so animation is right */
        swopToSmallList();
        loadOrderData(data.d.Value);
        checkForNewOrders();
    }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Recalulate Totals
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var recalulatingTotals = false;
function RecalculateTotals() {
    if (!recalulatingTotals) {
        recalulatingTotals = true;
        $("#recalculatingImg").show();
        AjaxHandler("RecalulateTotals", "{ 'OrderID':'" + CurrentDisplayOrderId + "', 'saveNewTotals':true}", onRecalulateTotals);
    }

    function onRecalulateTotals(Data) {
        $("#recalculatingImg").hide();
        CurrentOrderData.Order.SubTotal = leFormat(Data.d.SubTotal);
        CurrentOrderData.Order.TotalDelivery = leFormat(Data.d.TotalDelivery);
        CurrentOrderData.Order.TotalTax = leFormat(Data.d.TotalTax);
        CurrentOrderData.Order.TotalCost = leFormat(Data.d.TotalCost);

        $("#LabelSubTotal").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.SubTotal)));
        $("#LabelDelivery").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalDelivery)));
        $("#LabelTax").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalTax)));
        $("#LabelTotal").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalCost)));

        $("#orderList" + CurrentDisplayOrderId + " .orderListValue").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalCost)));

        updateItemPrices(Data.d.OrderItems);

        recalulatingTotals = false;
    }
}

function RecalculateTotalsAndEdit() {
    AjaxHandler("RecalulateTotals", "{ 'OrderID':'" + CurrentDisplayOrderId + "', 'saveNewTotals':false}", onRecalulateTotals);

    function onRecalulateTotals(Data) {
        var newTotalsMessage = ""; 
        newTotalsMessage += "<div id='RecalculateTotalsDialogBox' class='dialogBox'>";
        newTotalsMessage += "<div class='dialogHeader'>" + le.NewTotals + "</div>";
        newTotalsMessage += "<div style='text-align:right; text-shadow: 1px 1px #fff;'>";
        
        newTotalsMessage += "<strong>" + le.SubTotal + " :</strong> <input type='text' id='recalulateSubTotal' class='inputTextBoxesTotals inputBox' value='" + to2or4Places(Data.d.SubTotal) + "' /><br>";
        newTotalsMessage += "<strong>" + le.Delivery + " : </strong><input type='text' id='recalulateTotalDelivery' class='inputTextBoxesTotals inputBox' value='" + to2or4Places(Data.d.TotalDelivery) + "' /><br>";

        if ($("#LabelTax").size() > 0) {
            newTotalsMessage += "<strong>" + le.Tax + " : </strong><input type='text' id='recalulateTotalTax' class='inputTextBoxesTotals inputBox' value='" + to2or4Places(Data.d.TotalTax) + "' /><br>";
        }
        else {
            newTotalsMessage += "<input type='hidden' id='recalulateTotalTax' value='0' />";
        }
        newTotalsMessage += "<strong>" + le.Total + " : </strong><input type='text' id='recalulateTotalCost' class='inputTextBoxesTotals inputBox' value='" + to2or4Places(Data.d.TotalCost) + "' /><br>";
        
        newTotalsMessage += "</div>";
        newTotalsMessage += "<div class='dialogBoxButtons'>";


        newTotalsMessage += "<a id='newTotalsMessageSelectButton' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-ok'></i>" + le.UseTheseValues + "</a>";

        newTotalsMessage += "<a id='newTotalsMessageCancelButton' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-remove'></i>" + le.Cancel + "</a>";

        newTotalsMessage += "</div>";
        newTotalsMessage += "<div class='clearBoth'></div></div>";

        $.fancybox(newTotalsMessage);

        $("#RecalculateTotalsDialogBox .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
        $("#RecalculateTotalsDialogBox .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

        $("#newTotalsMessageCancelButton").click(function() { $.fancybox.close(); });
        $("#newTotalsMessageSelectButton").click(function() {
            CurrentOrderData.Order.SubTotal = $("#recalulateSubTotal").val();
            CurrentOrderData.Order.TotalDelivery = $("#recalulateTotalDelivery").val();
            CurrentOrderData.Order.TotalTax = $("#recalulateTotalTax").val();
            CurrentOrderData.Order.TotalCost = $("#recalulateTotalCost").val();

            $("#LabelSubTotal").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.SubTotal)));
            $("#LabelDelivery").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalDelivery)));
            $("#LabelTax").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalTax)));
            $("#LabelTotal").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalCost)));

            $("#orderList" + CurrentDisplayOrderId + " .orderListValue").html(currencySymbolBeforeAfter(leFormat(CurrentOrderData.Order.TotalCost)));
             
            AjaxHandler("UpdateTotals", '{ OrderID: ' + CurrentDisplayOrderId + ', TotalTax: "' + cleanValue($("#recalulateTotalTax").val()) + '", TotalDelivery: "' + cleanValue($("#recalulateTotalDelivery").val()) + '", SubTotal: "' + cleanValue($("#recalulateSubTotal").val()) + '", TotalCost: "' + cleanValue($("#recalulateTotalCost").val()) + '"}');
            $.fancybox.close();
        });

        function to2or4Places(theNumber) {
            var returnValue = new String(theNumber.toFixed(4));
            if (returnValue.substring(returnValue.length - 2, returnValue.length) == "00") { returnValue = theNumber.toFixed(2); }
            return leFormat(returnValue);
        }
    }
}

function updateItemPrices(orderItemPrices) {
    if (orderItemPrices) {
        for (var i = 0; i < orderItemPrices.length; i++) {
            for (i2 = 0; i2 < CurrentOrderData.OrderItems.length; i2++) {
                if (CurrentOrderData.OrderItems[i2].OrderItemID == orderItemPrices[i].OrderItemID) {
                    CurrentOrderData.OrderItems[i2].Price = orderItemPrices[i].NewPriceValue;
                    CurrentOrderData.OrderItems[i2].TotalPrice = (CurrentOrderData.OrderItems[i2].Price * CurrentOrderData.OrderItems[i2].Quantity).toFixed(2);
                }
            }
        }  
        displayOrderDetails();  
    }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Delivery Selector 
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var selectedDeliveryMethod = 0;
function changeDeliveryMethod() {
    var changeDeliveryMethodText = ""; 
    changeDeliveryMethodText += "<div id='changeDeliveryMethodDialogBox' class='dialogBox'>";
    changeDeliveryMethodText += "<div class='dialogHeader'>" + le.ChangeDeliveryMethod + "</div>";
    changeDeliveryMethodText += "<div id='changeDeliveryList'>";

    var foundCurrentMethod = false;
    var tempValue = $("#LabelDeliveryMethod").html();
    tempValue = tempValue.substr(0, tempValue.indexOf("<!--"));
    altRowInsert = "";
    for (i = 0; i <= deliveryMethods.length - 1; i++) {
        
        if (Math.round(i / 2) == (i / 2)) { altRowInsert = ""; } else { altRowInsert = " dialogBoxAltRow"; }

        if (selectedDeliveryMethod == deliveryMethods[i].Number || tempValue == deliveryMethods[i].Name) {
            changeDeliveryMethodText += "<div class='changeDeliveryItems changeDeliveryItemsSelected" + altRowInsert + "' ";
            foundCurrentMethod = true;
            selectedDeliveryMethod = deliveryMethods[i].Number;
        }
        else {
            changeDeliveryMethodText += "<div class='changeDeliveryItems" + altRowInsert + "' ";
        }
        changeDeliveryMethodText += "onclick='selectDeliveryMethod(" + deliveryMethods[i].Number + ")' ondblclick='dblclickSelectDeliveryMethod(" + deliveryMethods[i].Number + ")' id='changeDeliveryItem" + deliveryMethods[i].Number + "'>";
        changeDeliveryMethodText += "<div class='changeDeliveryName'>" + deliveryMethods[i].Name + "</div>";
        changeDeliveryMethodText += "<div class='changeDeliveryValue'>" + currencySymbolBeforeAfter(" " + deliveryMethods[i].Value) + "</div>";
        changeDeliveryMethodText += "</div>";
    }

    if (altRowInsert == "") { altRowInsert = " dialogBoxAltRow"; } else { altRowInsert = ""; }

    changeDeliveryMethodText += "<div class='changeDeliveryItems" + altRowInsert + "' id='changeDeliveryItem0'>"
    changeDeliveryMethodText += "<input type='text' id='customDeliveryName' class='deliveryInputBox inputBox' value='" + le.DeliveryName + "' />";
    changeDeliveryMethodText += "<input type='text' id='customDeliveryValue' class='deliveryInputBox inputBox' value='" + le.Price + "' />";
    changeDeliveryMethodText += "</div>";

    changeDeliveryMethodText += "</div>";

    changeDeliveryMethodText += "<div class='dialogBoxButtons'>";


    changeDeliveryMethodText += "<a id='changeDeliverySelectButton' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-ok'></i>" + le.OK + "</a>";

    changeDeliveryMethodText += "<a id='changeDeliveryCancelButton' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-remove'></i>" + le.Cancel + "</a>";

    changeDeliveryMethodText += "</div>";
    changeDeliveryMethodText += "<div class='clearBoth'></div></div>";

    $.fancybox(changeDeliveryMethodText);
    
    $("#customDeliveryValue").focusin(function() {  if ($("#customDeliveryValue").val() == le.Price) { $("#customDeliveryValue").val("");} selectDeliveryMethod(0); });
    $("#customDeliveryValue").focusout(function() {  if ($("#customDeliveryValue").val() == "") { $("#customDeliveryValue").val(le.Price);} });

    $("#customDeliveryName").focusin(function() { if ($("#customDeliveryName").val() == le.DeliveryName) { $("#customDeliveryName").val("");} selectDeliveryMethod(0); });
    $("#customDeliveryName").focusout(function() { if ($("#customDeliveryName").val() == "") { $("#customDeliveryName").val(le.DeliveryName);} });

    $("#changeDeliveryMethodDialogBox .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
    $("#changeDeliveryMethodDialogBox .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

    $("#changeDeliveryCancelButton").click($.fancybox.close);
    $("#changeDeliverySelectButton").click(chooseDeliveryMethod);
}

function selectDeliveryMethod(methodNumber) {
    selectedDeliveryMethod = methodNumber;
    $(".changeDeliveryItems").removeClass("changeDeliveryItemsSelected");
    $("#changeDeliveryItem" + methodNumber).addClass("changeDeliveryItemsSelected");
}

function dblclickSelectDeliveryMethod(methodNumber) {
    selectedDeliveryMethod = methodNumber;
    $(".changeDeliveryItems").removeClass("changeDeliveryItemsSelected");
    $("#changeDeliveryItem" + methodNumber).addClass("changeDeliveryItemsSelected");
    chooseDeliveryMethod();
}

function chooseDeliveryMethod() {
    var deliveryValue = 0;
    var deliveryMethod = "";

    if (selectedDeliveryMethod==0) {
        deliveryValue = $("#customDeliveryValue").val();
        deliveryMethod = $("#customDeliveryName").val();
    }
    else {
        for (i = 0; i <= deliveryMethods.length - 1; i++) {
            if (selectedDeliveryMethod == deliveryMethods[i].Number) {
                deliveryValue = deliveryMethods[i].Value;
                deliveryMethod = deliveryMethods[i].Name;
            }
        }
    }

    if (deliveryValue != NaN) {
        $("#LabelDelivery").html(currencySymbolBeforeAfter(leFormat(deliveryValue)));
        $("#LabelDeliveryMethod").html(deliveryMethod);

        if (editMode) {
            AjaxHandler("UpdateDelivery", '{ OrderID:' + CurrentDisplayOrderId + ', TotalDelivery: "' + deliveryValue + '", DeliveryName: "' + deliveryMethod + '"}');
        }
        else {
            AjaxHandler("UpdateDelivery", '{ OrderID:' + CurrentDisplayOrderId + ', TotalDelivery: "' + deliveryValue + '", DeliveryName: "' + deliveryMethod + '"}', RecalculateTotals);
        }
        $.fancybox.close();
    }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Product Selector 
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var CurrentOrderItemID;
var CurrentSelectedProduct = 0;

var ProductSelectorRecordSetSize = 25;
var ProductSelectorRecordCount = 0;
var ProductSelectorRowCount = 0;
var callCounter = 0;

var categoryBreadcrumbs = [];
var ProductSelectorSelectedCategory = 0;
var productListLoading = false;
var productListTimerID;

function showProductSelector(orderItemID) {
    CurrentOrderItemID = orderItemID;

    var productHtml = "<div id='productSelector' class='dialogBox'><div class='dialogHeader'>" + le.SelectProduct + "</div>";
    productHtml += "<table cellspacing='0' cellpadding='0'><tr class='productSelectorLabels'><td width='70px'><input type='radio' name='searchRadio' checked='checked' id='searchRadioAll' value='all' /><label for='searchRadioAll'>" + toProperCase(le.All) + "</label></td>";
    productHtml += "<td width='110px'><input type='radio' name='searchRadio' id='searchRadioSearch' value='search' /><label for='searchRadioSearch'>" + le.Search + " :</label></td><td><input id='productSelectorSearch' type='text' class='inputBox' /></td></tr>";
    productHtml += "<tr class='productSelectorLabels'><td width='70px'><input type='radio' name='categoryRadio' checked='checked' id='categoryRadioAll' value='all' /><label for='categoryRadioAll'>" + toProperCase(le.All) + "</label></td>";
    productHtml += "<td width='110px' height='60px'><input type='radio' name='categoryRadio' id='categoryRadioCategory' value='search' /><label for='categoryRadioCategory'>" + le.Category + " :</label></td><td><div id='categorySelectorRapper'><div id='categorySelector'></div></div></td></tr>";
    productHtml += "</table>";
    productHtml += "<div id='productSelectorListRapper'><div id='productSelectorList'></div></div>";
    productHtml += "<div class='dialogBoxButtons'>";

    productHtml += "<a id='productSelectorSelectButton' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-ok'></i>" + le.SelectProduct + "</a>";

    productHtml += "<a id='productSelectorCancelButton' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-remove'></i>" + le.Cancel + "</a>";

    productHtml += "</div>";
    productHtml += "<div class='clearBoth'></div></div>";


    categoryBreadcrumbs = [];
    $.fancybox(productHtml);

    $("#productSelector .inputBox").focusin(function () { $(this).addClass("inputBoxFocus"); });
    $("#productSelector .inputBox").focusout(function () { $(this).removeClass("inputBoxFocus"); });

    loadCategoryDropdown("-1[EKM:SPLITTER]" + le.Home);
    
    $("#productSelectorSelectButton").click(function() { populateOrderItem(); $.fancybox.close(); });
    $("#productSelectorCancelButton").click(function() { $.fancybox.close(); });

    $("#productSelectorSearch").keyup(function () {         
        clearTimeout(productListTimerID);
        productListTimerID = setTimeout("loadProductList(true)",500);
        document.getElementById("searchRadioSearch").checked = true;
    });

    $("#searchRadioAll,#searchRadioSearch,#categoryRadioCategory,#categoryRadioAll").click(function() {loadProductList(true);});
}

function loadCategoryDropdown(catIDcatName) {
    if (catIDcatName != "") {

        var catID = catIDcatName.split("[EKM:SPLITTER]")[0];
        var catName = catIDcatName.split("[EKM:SPLITTER]")[1];

        if (catID != "-1") 
            { document.getElementById("categoryRadioCategory").checked = true; }
        else
            {catID = "0";}

        var catIDFound = false;
        var catBreadCrumbLength = categoryBreadcrumbs.length;
        for (var i = 0; i < catBreadCrumbLength; i++) {
            if (catIDFound) {
                categoryBreadcrumbs.pop();
            }
            else {
                if (categoryBreadcrumbs[i].catID == catID) {
                    catIDFound = true;
                }
            }
        }
        if (catIDFound != true) {
            categoryBreadcrumbs.push({ 'catName': catName, 'catID': catID });
        }
        ProductSelectorSelectedCategory = catID;
        $("categorySelector").empty();
        AjaxHandler("GetCategoryList", "{ 'ParentId': '" + catID + "'}", onSuccessGetCategoryList);

        loadProductList(true);
    }

    function onSuccessGetCategoryList(data) {
        var categorySelector = "";

        for (var i = 0; i < categoryBreadcrumbs.length; i++) {
            categorySelector += "<div class='productBreadcrumb' onclick='loadCategoryDropdown(\"" + categoryBreadcrumbs[i].catID + "[EKM:SPLITTER]" + categoryBreadcrumbs[i].catName + "\")'>" + categoryBreadcrumbs[i].catName + "</div> "
            if (data.d.Item.length != 0 || i != categoryBreadcrumbs.length - 1) {
                categorySelector += "&gt; "
            }
        }

        if (data.d.Item.length != 0) {
            categorySelector += "<select id='categorySelect' class='inputBox'>";
            categorySelector += "<option class='categorySelectItem' value=''></option>";
            for (i = 0; i <= data.d.Item.length - 1; i++) {
                categorySelector += "<option class='categorySelectItem' value='" + data.d.Item[i].ID + "[EKM:SPLITTER]" + data.d.Item[i].CategoryName + "'>" + data.d.Item[i].CategoryName + "</option>";
            }
            categorySelector += "</select>";
        }
        $("#categorySelector").html(categorySelector);

        var categorySelectorMarginTop = ($("#categorySelectorRapper").height()-$("#categorySelector").height())/2;
        /*$(".dialogHeader").html(" Rapper:" + $("#categorySelectorRapper").height() + " categorySelector:" + $("#categorySelector").height() + " :" + categorySelectorMarginTop);*/
        $("#categorySelector").css({ 'margin-top': ($("#categorySelectorRapper").height()-$("#categorySelector").height())/2  })
        /*$.fancybox.resize();*/

        $("#categorySelect").change(function () { loadProductList(true); loadCategoryDropdown(this.value) });

        $("#categorySelect").focusin(function () { $(this).addClass("inputBoxFocus"); });
        $("#categorySelect").focusout(function () { $(this).removeClass("inputBoxFocus"); });
    }
    
}

function loadProductList(NewQuery){
    if (NewQuery) {
        ProductSelectorRecordCount = 0;
        ProductSelectorRowCount = 0;
        $("#productSelectorList").empty();
        productListLoading = false;
        CurrentSelectedProduct = 0;
    }

    if (!productListLoading) {
        productListLoading = true;
        $("#productSelectorList").append("<div class='noProductsMessage loadingSpinner'>" + le.Loading + "</div>");
        var selectedSearch = $("#productSelectorSearch").val();
        var selectedCategory = ProductSelectorSelectedCategory;


        var productStart = ProductSelectorRecordCount + 1;
        var productEnd = productStart + ProductSelectorRecordSetSize;

        if ($("[name=searchRadio]:checked").val() == "all") selectedSearch = "";
        if ($("[name=categoryRadio]:checked").val() == "all") selectedCategory = "-1";

        callCounter++;
        AjaxHandler("GetProductList", "{'CategoryID': '" + selectedCategory + "', 'Search':'" + selectedSearch + "', 'StartRecord':" + productStart + ", 'EndRecord':" + productEnd + ", 'CallID':" + callCounter + "}", onSuccessGetProductList);
    }

    function onSuccessGetProductList(data) {
        var altRowInsert;
        var productSelectorListDiv;
        var tempPPID = -1;
        if (data.d.CallID == callCounter) {
            $(".noProductsMessage").remove();
            for (i = 0; i <= data.d.Item.length - 1; i++) {
                productSelectorListDiv = "";
                if (Math.round(ProductSelectorRecordCount / 2) == (ProductSelectorRecordCount / 2)) { altRowInsert = " dialogBoxAltRow"; } else { altRowInsert = ""; }

                if (data.d.Item[i].isVariant == true) {
                    if (tempPPID != data.d.Item[i].PPID) {
                        tempPPID = data.d.Item[i].PPID;
                        productSelectorListDiv += "<div class='productListVariantHead' >" + data.d.Item[i].ProductName + "</div>";
                        productSelectorListDiv += "<div id='productListItemID" + data.d.Item[i].ID + "' class='productListVariant " + altRowInsert + "' onclick='selectProductItem(\"" + data.d.Item[i].ID + "\")' ondblclick='selectProduct(\"" + data.d.Item[i].ID + "\")' ><div class='productListProductCode'>" + data.d.Item[i].ProductCode + "</div>" + data.d.Item[i].VariantName;
                        ProductSelectorRowCount++;
                    }
                    else {
                        productSelectorListDiv += "<div id='productListItemID" + data.d.Item[i].ID + "' class='productListVariant " + altRowInsert + "' onclick='selectProductItem(\"" + data.d.Item[i].ID + "\")' ondblclick='selectProduct(\"" + data.d.Item[i].ID + "\")' ><div class='productListProductCode'>" + data.d.Item[i].ProductCode + "</div>" + data.d.Item[i].VariantName;
                    }
                }
                else {
                    productSelectorListDiv += "<div id='productListItemID" + data.d.Item[i].ID + "' class='productListItem " + altRowInsert + "' onclick='selectProductItem(\"" + data.d.Item[i].ID + "\")' ondblclick='selectProduct(\"" + data.d.Item[i].ID + "\")' ><div class='productListProductCode'>" + data.d.Item[i].ProductCode + "</div>" + data.d.Item[i].ProductName;
                }
                if (data.d.Item[i].Stock != null) { productSelectorListDiv += "<div class='productListStock'>" + data.d.Item[i].Stock + " " + le.InStock + "</div>"; }
                productSelectorListDiv += "<div style='clear:both;'></div>";
                productSelectorListDiv += "</div>";
                $("#productSelectorList").append(productSelectorListDiv);
                ProductSelectorRowCount++;
                ProductSelectorRecordCount++;
            }

            if (NewQuery) {
                if (data.d.Item.length < 1) { $("#productSelectorList").append("<div class='noProductsMessage'>" + le.NoProductsFound + "</div>"); }
            }

            if (data.d.Item.length != 0) {
                var productSelectorLoadPoint = ($('#productSelectorList').innerHeight() - $('#productSelectorListRapper').innerHeight() - $('.customerCommRow').height() - 23);
                $("#productSelectorListRapper").scroll(function () {
                    if ($("#productSelectorListRapper").scrollTop() > productSelectorLoadPoint) { 
                        $("#productSelectorListRapper").unbind();
                        loadProductList(false);
                    } 
                });
            }
        }
        productListLoading = false;
    }
}

function selectProductItem(ProductID) {
    CurrentSelectedProduct = ProductID;
    $(".productListItem").removeClass("productListItemSelected");
    $(".productListVariant").removeClass("productListItemSelected");
    $("#productListItemID" + CurrentSelectedProduct).addClass("productListItemSelected");
}

function selectProduct(ProductID) {
    CurrentSelectedProduct = ProductID;
    populateOrderItem();
}

function populateOrderItem() {
    if (CurrentSelectedProduct != 0) {
        AjaxHandler("GetProduct", "{ 'ProductID': '" + CurrentSelectedProduct + "'}", onSuccessGetProduct);
    }

    function onSuccessGetProduct(data) {
        if (data.d.ProductCode == "") {
            $("#ordersItemInputID" + CurrentOrderItemID).html(data.d.ID);
        }
        else {
            $("#ordersItemInputID" + CurrentOrderItemID).html(data.d.ProductCode);
        }
        $("#ordersItemInputProductId" + CurrentOrderItemID).val(data.d.ID);
        $("#ordersItemInputDetails" + CurrentOrderItemID).val(data.d.ProductName);
        $("#ordersItemInputOptions" + CurrentOrderItemID).val("");
        $("#ordersItemInputPrice" + CurrentOrderItemID).val(data.d.Price);
        $("#ordersItemInputQuantity" + CurrentOrderItemID).val("1");
        $("#ordersItemInputStock" + CurrentOrderItemID).val(data.d.Stock);

        lastAddedName = data.d.ProductName;
        lastAddedPrice = data.d.Price;

        for (i = 0; i <= CurrentOrderData.OrderItems.length - 1; i++) {
            if (CurrentOrderData.OrderItems[i].OrderItemID == CurrentOrderItemID) {
                CurrentOrderData.OrderItems[i].Details = data.d.ProductName;
                CurrentOrderData.OrderItems[i].Price = data.d.Price;
                CurrentOrderData.OrderItems[i].ParentProductID = data.d.PPID;
            }
        }

        $.fancybox.close();
    }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Customer Selector 
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var selectedCustomerId = 0;
var CurrentCustomerTotalRecords = -1;
var CurrentCustomerData = [];

var CustomerRecordSetSize = 50;
var CustomerStartRecord = 0;
var CustomerEndRecord = 0;

var customerlineCounter = 0;
 
var customerLoading = false;
var customerSelectorTimerID;

function showSelectCustomersDialog() {

    var customerHtml = "<div id='customerSelector' class='dialogBox'><div class='dialogHeader'>" + le.SelectCustomer + "</div>";
    customerHtml += "<div class='dialogHelpText'>" + le.Selectwhichcustomeryoudliketobeassociatedwiththisorder + "</div>";
    customerHtml += "<div>" + le.Search + "<input id='customerSelectorSearch' type='text' class='inputBox' /></div>";
    customerHtml += "<div id='customerSelectorListRapper'><div id='customerSelectorList'><div id='customerSelectorLoading'>" + le.Loading + "</div></div></div>";
    customerHtml += "<div class='dialogBoxButtons'>";

    customerHtml += "<a id='customerSelectorSelectButton' href='#' class='uifw-frm-button uifw-icon dialogBoxPositive'><i class='icon-ok'></i>" + le.SelectCustomer + "</a>";

    customerHtml += "<a id='customerSelectorCancelButton' href='#' class='uifw-frm-button uifw-icon dialogBoxNegative'><i class='icon-remove'></i>" + le.Cancel + "</a>";

    customerHtml += "<div class='clearBoth'></div></div>";

    loadCustomers(true);
    $.fancybox(customerHtml);

    $("#customerSelectorSelectButton").click(function() { choiceCustomer(selectedCustomerId); });
    $("#customerSelectorCancelButton").click(function() { $.fancybox.close(); });
    $("#customerSelectorSearch").keyup(function() {
        clearTimeout(customerSelectorTimerID);
        customerSelectorTimerID = setTimeout("loadCustomers(true)",500);    
    });
}

function loadCustomers(newList) {
    if (!customerLoading) {
        customerLoading = true;
        var search = $("#customerSelectorSearch").val();
        if (search == 'undefined' || search == null) { search = ""; } else { search = search.replace(/"/g, "\\\""); }
        if (newList) {
            CustomerStartRecord = 0;
            CustomerEndRecord = CustomerRecordSetSize;
            CurrentCustomerData = [];
            customerlineCounter = 0;
            $("#customerSelectorList").empty();
            $("#customerSelectorList").append("<div id='customerSelectorLoading'>" + le.Loading + "</div>");
        }
        else {
            CustomerStartRecord = CurrentCustomerData.length;
            CustomerEndRecord = CustomerStartRecord + CustomerRecordSetSize;
            $("#customerSelectorLoading").html("loading..");
        }
        AjaxHandler("GetCustomerList", '{ SearchFor: "' + search + '", OrderBy: "Name ", StartRecord: ' + CustomerStartRecord + ', EndRecord: ' + CustomerEndRecord + ', Persit:false }', OnSuccessGetCustomerList);
    }
}

function OnSuccessGetCustomerList(data) {
    var altRowInsert = " customerListItemAlt";
    if (data.d.Items == null || data.d.TotalRecords == null || data.d.TotalRecords == 0) {
        $("#customerSelectorLoading").html(le.NoCustomersFound);
        CurrentCustomerTotalRecords = 0;
        loadingOrderList = false;
    }
    else {
        $("#customerSelectorLoading").remove();
        for (var i = 0; i < data.d.Items.length; i++) {
            if (data.d.Items[i].Firstname != "" || data.d.Items[i].Lastname != "" || data.d.Items[i].Company != "" || data.d.Items[i].Email != "") {

                if (Math.round(customerlineCounter / 2) == (customerlineCounter / 2)) { altRowInsert = " customerListItemAlt"; } else { altRowInsert = ""; }

                var customerSelectorListInsert = ""
                customerSelectorListInsert += "<div id='customerListItem" + data.d.Items[i].Id + "' class='customerListItem" + altRowInsert + "' onclick='selectCustomer(" + data.d.Items[i].Id + ")' ondblclick='choiceCustomer(" + data.d.Items[i].Id + ")'>";
            
                if (data.d.Items[i].Firstname != "" || data.d.Items[i].Lastname != "") {
                    customerSelectorListInsert += "<div title='" + data.d.Items[i].Firstname + " " + data.d.Items[i].Lastname + "'>" + data.d.Items[i].Firstname + " " + data.d.Items[i].Lastname + "</div>";
                }
                if (data.d.Items[i].Company != "") {
                    customerSelectorListInsert += "<div title='" + data.d.Items[i].Company + "'>" + data.d.Items[i].Company + "</div>";
                }
                if (data.d.Items[i].Email != "") {
                    customerSelectorListInsert += "<div title='" + data.d.Items[i].Email + "'>" + data.d.Items[i].Email + "</div>";
                }

                customerSelectorListInsert += "</div>";
                $("#customerSelectorList").append(customerSelectorListInsert);

                customerlineCounter++;
            }
            CurrentCustomerData.push(data.d.Items[i].Id);
        }
        $("#customerSelectorList").append("<div id='customerSelectorLoading'>&nbsp;</div>");
    }

    var customerSelectorLoadPoint = ($('#customerSelectorList').innerHeight() - $('#customerSelectorListRapper').innerHeight() - 64);
    $("#customerSelectorListRapper").scroll(function () {
        if ($("#customerSelectorListRapper").scrollTop() > customerSelectorLoadPoint) { 
            $("#customerSelectorListRapper").unbind();
            loadCustomers(false);
        } 
    });

    customerLoading = false;
}
    
function selectCustomer(custID) {
    selectedCustomerId = custID;
    $(".customerListSelected").removeClass("customerListSelected");
    $("#customerListItem" + custID).addClass("customerListSelected");
}

function choiceCustomer(custID) {
    if (custID != 0) {
        showDiaglogBox("<div class=\"dialogHeader\">Are you sure?</div><div class='dialogHelpText'>" + le.Thiswillremoveanycustomerdetailscurrentlyassociatedwiththisorder + "</div>", "YesNo", function () {
            selectedCustomerId = custID;
            AjaxHandler("GetCustomer", '{ CustomerID: "' + selectedCustomerId + '" }', OnSuccessGetCustomer);
        });
    }

    function OnSuccessGetCustomer(data) {
        AjaxHandler("UpdateOrdersCustomer", '{ OrderID: "' + CurrentDisplayOrderId + '", CustomerID: "' + data.d.Customer.Id + '" }');

        CurrentDisplayCustomerId = data.d.Customer.Id;

        CurrentOrderData.Customer.Id = data.d.Customer.Id;
        CurrentOrderData.Customer.Firstname = data.d.Customer.Firstname;
        CurrentOrderData.Customer.Lastname = data.d.Customer.Lastname;
        CurrentOrderData.Customer.Company = data.d.Customer.Company;
        CurrentOrderData.Customer.Address1 = data.d.Customer.Address1;
        CurrentOrderData.Customer.Address2 = data.d.Customer.Address2;
        CurrentOrderData.Customer.Town = data.d.Customer.Town;
        CurrentOrderData.Customer.County = data.d.Customer.County;
        CurrentOrderData.Customer.Country = data.d.Customer.Country;
        CurrentOrderData.Customer.Postcode = data.d.Customer.Postcode;
        CurrentOrderData.Customer.Email = data.d.Customer.Email;
        CurrentOrderData.Customer.Telephone = data.d.Customer.Telephone;
        CurrentOrderData.Customer.Fax = data.d.Customer.Fax;
        CurrentOrderData.Customer.BillingAddressVerified = data.d.BillingAddressVerified;

        $("#inputFirstname").val(CurrentOrderData.Customer.Firstname);
        $("#inputLastname").val(CurrentOrderData.Customer.Lastname);
        $("#inputCompany").val(CurrentOrderData.Customer.Company);
        $("#inputAddress1").val(CurrentOrderData.Customer.Address1);
        $("#inputAddress2").val(CurrentOrderData.Customer.Address2);
        $("#inputTown").val(CurrentOrderData.Customer.Town);
        $("#inputCounty").val(CurrentOrderData.Customer.County);
        $("#inputCountry").val(CurrentOrderData.Customer.Country);
        $("#inputPostcode").val(CurrentOrderData.Customer.Postcode);

        $("#inputEmail").val(CurrentOrderData.Customer.Email);
        $("#inputTelephone").val(CurrentOrderData.Customer.Telephone);
        $("#inputFax").val(CurrentOrderData.Customer.Fax);

        $("#LabelCustomerName").html(CurrentOrderData.Customer.Firstname + " " + CurrentOrderData.Customer.Lastname);
        $("#LabelCompany").html(CurrentOrderData.Customer.Company);
        $("#LabelAddress1").html(CurrentOrderData.Customer.Address1);
        $("#LabelAddress2").html(CurrentOrderData.Customer.Address2);
        $("#LabelTown").html(CurrentOrderData.Customer.Town);
        $("#LabelCounty").html(CurrentOrderData.Customer.County);

        $("#customerViewButton").show();

        CurrentOrderData.Customer.Id
        CurrentOrderData.Customer.Firstname
    }    
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

var transitioning = false;
function swopToFullToSmallList() {
    if (!transitioning) {
        if (bulkMode) {
            $(".orderListItem").removeClass("orderListSelected");
            $(".orderListItem .orderListCheckBox").attr("checked", "");
            SelectedOrders = [];
            swopToSmallList();
            upDateSummary();
            bulkMode = false;
        }
        else {
            $(".orderListItem").removeClass("orderListSelected");
            SelectedOrders = [];
            CurrentDisplayOrderId = -1;
            swopToFullList();
            bulkMode = true;
        }
    }
}

function swopToFullList() {
    if (!transitioning) {
        transitioning = true;
        $("#toOrdersList").hide();
        $("#orderDetails").hide();
        $("#searchFor").animate({ 'width': 886 });

        $("#itemListHeaderWrapper").hide().stop().animate({ 'height':55 }, 500, 'swing');
        $("#bulkPanelWrapper").stop().animate({ 'height': 54 }, 500, 'swing');
    
        $("#ordersList").stop().animate({ 'width':978 }, { 'duration':500, 'easing':'swing', 'step': resizeOrdersList , 'complete':
            function() { 
                $("#itemListWrapper").removeClass("goSmall");
                transitioning = false;
            }});
    }
}

function swopToSmallList() {
    if (!transitioning) {
        transitioning = true;
        $("#searchFor").animate({ 'width': 180 });

        $("#itemListWrapper").addClass("goSmall");
        $("#itemListHeaderWrapper").stop().animate({ 'height':0 }, 500, 'swing', function() { $("#itemListHeaderWrapper").hide(); });
        $("#bulkPanelWrapper").stop().animate({ 'height': 0 }, 500, 'swing');
    
        $("#ordersList").stop().animate({ 'width':272 }, { 'duration':500, 'easing':'swing', 'step': resizeOrdersList , 'complete':
            function() { 
                $("#orderDetails").show();
                $("#toOrdersList").show();
                transitioning = false;
            } });
    }
}

function resizeOrdersList() {
    var newHeight = $(window).height() - $("#pageContent").position().top - 15;
    var otherBits = $("#itemListHeaderWrapper").height() + $("#bulkPanelWrapper").height() + 70;
    $("#itemList").css({ 'height': newHeight - otherBits});
    $("#orderDetails").css({ 'height': newHeight });

    if (printDialogOpen) { reSizePrintDialog(); }
}

var OldPageContentHeight = -50;
var resizeOrdersListUntilDoneLoopTimer;

function resizeOrdersListUntilDone() {
    OldPageContentHeight = -50;
    resizeOrdersListUntilDoneLoop();
}

function resizeOrdersListUntilDoneLoop() {
    clearTimeout(resizeOrdersListUntilDoneLoopTimer);
    if ($("#pageContent").position().top != OldPageContentHeight) {
        resizeOrdersListUntilDoneLoopTimer = setTimeout("resizeOrdersListUntilDoneLoop();",50);
        resizeOrdersList();
        OldPageContentHeight = $("#pageContent").position().top;
    }
}

function updateVerifiedFlag(sName)
{
    if (sName == "Billing") {
        AjaxHandler("UpdateBillingAddressVerified", '{ CustomerId: "' + customerId + '", Flag: 0 }');
        BillingVerified = false;
    } else {
        AjaxHandler("UpdateShippingAddressVerified", '{ OrderId: "' + CurrentDisplayOrderId + '", Flag: 0 }');
        ShippingVerified = false;
    }
}

function setupFileUpload()
{
    $(".optionImageLink").click(function (event) {

        event.preventDefault();

        var dataLink = $(this).attr("data-link");
        var deleteDate = $(this).attr("data-dtd");
        var extension = dataLink.toLowerCase().substr(dataLink.length - 4);
        var modalTitle = $(this).html();
        $(".imageexpirydate > span").html("");

        if (extension.indexOf(".pdf") >= 0) {

            imageUrl = "/images/pdfimage.png";

        } else if (extension.indexOf(".ai") >= 0) {

            imageUrl = "/images/aiimage.png";

        } else if (extension.indexOf(".psd") >= 0) {

            imageUrl = "/images/psdimage.png";

        } else {

            var imageUrl = "http://" + yourAccountServerName + dataLink;

        }

        var fileurl = dataLink.replace("/ekmps/shops/" + shopName + "/resources/Options/","");

        $("#optionImageModal img.optionImage").attr("src", imageUrl);

        $("#ui-dialog-title-optionImageModal").html(modalTitle);
        $(".imageexpirydate > span").append(deleteDate);
        
        $("#optionImageModal .downloadimage").attr("href", "http://" + yourAccountServerName + "/ekmps/shops/" + shopName + "/index.asp?function=OPTIONIMAGE&fn=DOWNLOAD&fileName=" + fileurl);

        $("#optionImageModal").dialog("open");

    });
}

$(function () {

    $("#googlemap").dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        width: 540
    });

    $("#optionImageModal").dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        width: 540,
        position: {
            my: "center",
            at: "center",
            of: window
        }
   
    });

    $("#optionImageModal img.optionImage").bind("load", function () {
        $("#optionImageModal").dialog("option", "position", {
            my: "center",
            at: "center",
            of: window
        });
    });

    $("#mb1").bind("click", function () {
        var url = "googlemap.aspx?Address=";
        var address1 = $.trim($("#LabelAddress1").html());
        var address2 = $.trim($("#LabelAddress2").html());
        var town = $.trim($("#LabelTown").html());
        var county = $.trim($("#LabelCounty").html());
        var postcode = $.trim($("#LabelPostcode").html());
        var country = $.trim($("#LabelCountry").html());
        url += address1 + " " + address2 + " " + town + " " + county + " " + postcode + " " + country;
        $("#mapframe").attr("src", url);

        $("#googlemap").dialog("open");
        return false;

    });

    $("#mb2").bind("click", function () {
        var url = "googlemap.aspx?Address=";
        var address1 = $.trim($("#LabelShippingAddress1").html());
        var address2 = $.trim($("#LabelShippingAddress2").html());
        var town = $.trim($("#LabelShippingTown").html());
        var county = $.trim($("#LabelShippingCounty").html());
        var postcode = $.trim($("#LabelShippingPostcode").html());
        var country = $.trim($("#LabelShippingCountry").html());
        url += address1 + " " + address2 + " " + town + " " + county + " " + postcode + " " + country;
        $("#mapframe").attr("src", url);

        $("#googlemap").dialog("open");
        return false;

    });

    $("#CPGetQuote").bind("click", function () {
        if ($("#CPModelInsert").length == 0) {

            var url = "CourierPigeon/CourierPigeon.aspx?";
            url += "orderid=" + CurrentOrderData.Order.Id;
            
            $("body").append("<div id='CPModelInsert'>" + $("#courierPigeonContainer").html() + "</div>");
            $("#CPModelInsert").find("#courierPigeonIframe").attr("src", url);
            
        }
    });


    $("#CPViewDetails").bind("click", function () {
        if ($("#CPModelInsert").length == 0) {

            var url = "CourierPigeon/CourierPigeon.aspx?";
            url += "cpReference=" + $(this).attr("data-cpReference");

            $("body").append("<div id='CPModelInsert'>" + $("#courierPigeonContainer").html() + "</div>");
            $("#CPModelInsert").find("#courierPigeonIframe").attr("src", url);
        }
    });

    $("#AbandonedCartModel").dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        width: 388,
        buttons: [{ 
		            text: le.DoneClose,
		            click: function() { 
		                $j(this).dialog('close');
		            }
                }]
    });

    $("#AbandonedCart-Button").click(function () {
        $("#AbandonedCartModel").dialog("open");
    });

});

function closeCourierPigeonModel() {
    $("#CPModelInsert").remove();
}

function SetCourierPigeonReference(CourierPigeonReference) {
    if (CourierPigeonReference) {
        CurrentOrderData.Order.CourierPigeonReference = CourierPigeonReference;
        $("#CourierPigeon-GetQuote").hide();
        $("#CourierPigeon-ViewDetails").show();
        $("#CPViewDetails").attr({ "data-cpReference": CurrentOrderData.Order.CourierPigeonReference });
    }
}

$(window).load(function () {

    setupFileUpload();

});