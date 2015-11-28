<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true"
    CodeFile="Create-new-page.aspx.cs" Inherits="AdminPanel_Default" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script>
        $(function () {
            $('#ContentPlaceHolder1_FormView1_TitleTextBox').keyup(function () {
                $val = $(this).val();
                $('#ContentPlaceHolder1_FormView1_HeadingTextBox').val($val);
                $('#ContentPlaceHolder1_FormView1_MenuTextTextBox').val($val);
                $('#ContentPlaceHolder1_FormView1_SlugUrlTextBox').val($val.toLowerCase().replace(/ /g, "_").replace(/&/g, "and").replace(/\W/g, "").replace(/_/g, "-"));
                $('#ContentPlaceHolder1_FormView1_MetaKeywordsTextBox').val($val.toLowerCase());
                $('#ContentPlaceHolder1_FormView1_MetaDescriptonTextBox').val($val.toLowerCase());
            });
        });
    </script>
</asp:Content>
<asp:Content ID="title" ContentPlaceHolderID="title" runat="Server">

Create/Edit Page
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server"> 
     <section class="uiifw-layout-section">
                <header class="cf"><b>Create  And Edit Page</b> </header>
          <div class="body org ">
            
        <p> <asp:Label ID="lbl" runat="server" Font-Size="Large"></asp:Label></p>
        </div>
          <div> 
    <asp:FormView ID="FormView1" runat="server" DataKeyNames="PageID" DataSourceID="sdspages"
        DefaultMode="Insert" Width="748px" Height="563px" OnItemInserted="FormView1_ItemInserted"
        OnItemUpdated="FormView1_ItemUpdated">
        <EditItemTemplate>
            <table class="htmlForm">
            <%--<tr><td></td><td>
                 <asp:ValidationSummary ID="ValidationSummary1" runat="server" DisplayMode="SingleParagraph"  
                        HeaderText="<p class='uifw-message-header'>Errors</p>" ValidationGroup="IN" CssClass="uifw-message error"></asp:ValidationSummary>
                        
                </td></tr> --%>
                <tr>
                    <td colspan="3">
                  
                        <asp:TextBox ID="TitleTextBox" runat="server" Text='<%# Bind("Title") %>' Height="34px"
                            Width="640px" placeholder="Page Title" />
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="TitleTextBox"
                            ErrorMessage="Please Enter Page Title" ValidationGroup="IN" ForeColor="#FF3300" Text="*"></asp:RequiredFieldValidator>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <asp:TextBox ID="HeadingTextBox" runat="server" Text='<%# Bind("Heading") %>' Height="34px"
                            Width="640px" placeholder="Page Heading " />
                         
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <table class="html">
                         <p style="margin-bottom:8px;">Page Setting</P>
                            <tr>
                                <td>
                                    <b>MenuParent</b>
                                </td>
                                <td colspan="3">
                                    <asp:DropDownList ID="DropDownList1" runat="server" DataSourceID="sdsmenu" DataTextField="Title"
                                        DataValueField="PageID" Text='<%# Bind("MenuParent") %>' Height="28px" Width="266px"
                                        AppendDataBoundItems="true">
                                        <asp:ListItem Value="">Root</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>SlugUrl</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="SlugUrlTextBox" runat="server" Text='<%# Bind("SlugUrl") %>'  />
                                </td>
                                <td>
                                    <b>Priority</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="PriorityTextBox" runat="server" Text='<%# Bind("Priority") %>' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>MenuText</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="MenuTextTextBox" runat="server" Text='<%# Bind("MenuText") %>' />
                                </td>
                                <td>
                                    <b>MetaKeywords</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="MetaKeywordsTextBox" runat="server" Text='<%# Bind("MetaKeywords") %>' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;<b>Page Url</b>
                                </td>
                                <td>
                                    <asp:DropDownList ID="DropDownList2" runat="server" Height="28px" SelectedValue='<%# Bind("PageUrl") %>'
                                        Width="138px">
                                        <asp:ListItem Value="">-------SELECT-------</asp:ListItem>
                                        <asp:ListItem Value="gallery.php">gallery.php </asp:ListItem>
                                        <asp:ListItem Value="back.php"> back.php </asp:ListItem>
                                        <asp:ListItem Value="home.php"> home.php </asp:ListItem>
                                        <asp:ListItem Value="iindex-Copy.php">iindex - Copy.php  </asp:ListItem>
                                        <asp:ListItem Value="index.php"> index.php </asp:ListItem>
                                        <asp:ListItem Value="mail.php">mail.php  </asp:ListItem>
                                        <asp:ListItem Value="old-gallery.php"> old-gallery.php </asp:ListItem>
                                        <asp:ListItem Value="search.php"> search.php </asp:ListItem>
                                        <asp:ListItem Value="testimonials.php"> testimonials.php </asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>
                                    <b>Meta Descripton</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="MetaDescriptonTextBox" runat="server" Text='<%# Bind("MetaDescripton") %>' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>MenuPosition</b>
                                </td>
                                <td>
                                    <asp:DropDownList ID="DropDownList3" runat="server" SelectedValue='<%# Bind("MenuPosition") %>'
                                        Height="28px" Width="138px">
                                        <asp:ListItem Value="">-------SELECT-------</asp:ListItem>
                                        <asp:ListItem Value="Top">Top</asp:ListItem>
                                        <asp:ListItem Value="Bottom">Bottom</asp:ListItem>
                                        <asp:ListItem Value="Header">Header</asp:ListItem>
                                        <asp:ListItem Value="Footer">Footer</asp:ListItem>
                                        <asp:ListItem Value="Right">Right</asp:ListItem>
                                        <asp:ListItem Value="Left">Left</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>
                                    <b>Front Page</b>
                                </td>
                                <td>
                                    <itemtemplate>  
                 <asp:RadioButtonList ID="RadioButtonList1" runat="server" 
                          SelectedValue='<%# Bind("ShowOnFrontPage") %>'> 
           <asp:ListItem value="1">Yes</asp:ListItem> 
           <asp:ListItem value="0">No</asp:ListItem> 
                   </asp:RadioButtonList>    
                        </itemtemplate>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                    </td>
                </tr>
                <%--   <tr> <td> ShowInFooter</td><td> <asp:TextBox ID="ShowInFooterTextBox" runat="server" 
                Text='<%# Bind("ShowInFooter") %>' /></td><td></td></tr> --%>
                <tr>
                  
                    <td colspan="4">
                     <h2 style="margin-bottom:8px;">Description</h2>

                        <CKEditor:CKEditorControl ID="CKEditor1" BasePath="../ckeditor/" Text='<%# Bind("PageContents") %>'
                            Toolbar="Full" runat="server" Width="650px" Height="141px"></CKEditor:CKEditorControl>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td> <br /> <br />  
                        <asp:LinkButton ID="UpdateButton" runat="server" CausesValidation="True" CommandName="Update"
                            Text="Update Page"  CssClass="uifw-frm-big-button" ValidationGroup="IN" />
                         
                            
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
        </EditItemTemplate>
        <InsertItemTemplate>
            <table class="htmlForm">
            <%-- <tr><td colspan="3"> 
                 <asp:ValidationSummary ID="ValidationSummary1" runat="server" DisplayMode="SingleParagraph" 
                        HeaderText="<p class='uifw-message-header'>Error</p>" ValidationGroup="UP" CssClass="uifw-message error"></asp:ValidationSummary>
                        
                </td></tr>--%>
                <tr>
                    <td colspan="3"> 
                        <asp:TextBox ID="TitleTextBox" runat="server" Text='<%# Bind("Title") %>' Height="34px"
                            Width="640px" placeholder="Page Title" />
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="HeadingTextBox"
                            ErrorMessage="Please Enter Page Title" ValidationGroup="UP" ForeColor="#FF3300" Text="*"></asp:RequiredFieldValidator>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <asp:TextBox ID="HeadingTextBox" runat="server" Text='<%# Bind("Heading") %>' Height="34px"
                            Width="640px" placeholder="Page Heading " />
                         
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <table class="html">
                         <span style="font-size:20px" class="amount">Page Setting</span>
                            <tr>
                                <td>
                                    <b>MenuParent</b>
                                </td>
                                <td colspan="3">
                                    <asp:DropDownList ID="DropDownList1" runat="server" DataSourceID="sdsmenu" DataTextField="Title"
                                        DataValueField="PageID" Text='<%# Bind("MenuParent") %>' Height="28px" Width="266px"
                                        AppendDataBoundItems="true">
                                        <asp:ListItem Value="">Root</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>SlugUrl</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="SlugUrlTextBox" runat="server" Text='<%# Bind("SlugUrl") %>'/>
                                </td>
                                <td>
                                    <b>Priority</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="PriorityTextBox" runat="server" Text='<%# Bind("Priority") %>' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>MenuText</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="MenuTextTextBox" runat="server" Text='<%# Bind("MenuText") %>' />
                                </td>
                                <td>
                                    <b>MetaKeywords</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="MetaKeywordsTextBox" runat="server" Text='<%# Bind("MetaKeywords") %>' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Page Url</b>
                                </td>
                                <td>  
                                    <asp:DropDownList ID="DropDownList2" runat="server" Height="28px" SelectedValue='<%# Bind("PageUrl") %>'
                                        Width="138px">
                                        <asp:ListItem Value="">---SELECT-------</asp:ListItem>
                                        <asp:ListItem Value="gallery.php">gallery.php </asp:ListItem>
                                        <asp:ListItem Value="back.php"> back.php </asp:ListItem>
                                        <asp:ListItem Value="home.php"> home.php </asp:ListItem>
                                        <asp:ListItem Value="iindex-Copy.php">iindex - Copy.php  </asp:ListItem>
                                        <asp:ListItem Value="index.php"> index.php </asp:ListItem>
                                        <asp:ListItem Value="mail.php">mail.php  </asp:ListItem>
                                        <asp:ListItem Value="old-gallery.php"> old-gallery.php </asp:ListItem>
                                        <asp:ListItem Value="search.php"> search.php </asp:ListItem>
                                        <asp:ListItem Value="testimonials.php"> testimonials.php </asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>
                                    <b>Meta Descripton</b>
                                </td>
                                <td>
                                    <asp:TextBox ID="MetaDescriptonTextBox" runat="server" Text='<%# Bind("MetaDescripton") %>' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>MenuPosition</b>
                                </td>
                                <td>
                                    <%--  <asp:TextBox ID="MenuPositionTextBox" runat="server" Text='<%# Bind("MenuPosition") %>' />--%>
                                    <asp:DropDownList ID="DropDownList3" runat="server" SelectedValue='<%# Bind("MenuPosition") %>'
                                        Height="28px" Width="138px">
                                        <asp:ListItem Value="">--SELECT-------</asp:ListItem>
                                        <asp:ListItem Value="Top">Top</asp:ListItem>
                                        <asp:ListItem Value="Bottom">Bottom</asp:ListItem>
                                        <asp:ListItem Value="Header">Header</asp:ListItem>
                                        <asp:ListItem Value="Footer">Footer</asp:ListItem>
                                        <asp:ListItem Value="Right">Right</asp:ListItem>
                                        <asp:ListItem Value="Left">Left</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>
                                    <b>Front Page</b>
                                </td>
                                <td>
                                    <itemtemplate>  
                 <asp:RadioButtonList ID="RadioButtonList1" runat="server" 
                          SelectedValue='<%# Bind("ShowOnFrontPage") %>'> 
           <asp:ListItem value="1">Yes</asp:ListItem> 
           <asp:ListItem value="0"  Selected="true">No</asp:ListItem> 
                   </asp:RadioButtonList>    
                        </itemtemplate>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                    </td>
                </tr>
                <%--   <tr> <td> ShowInFooter</td><td> <asp:TextBox ID="ShowInFooterTextBox" runat="server" 
                Text='<%# Bind("ShowInFooter") %>' /></td><td></td></tr> --%>
                <tr>
                    <td colspan="3">
                    <span style="font-size:20px" class="amount">Decription</span>
                        <CKEditor:CKEditorControl ID="CKEditor1" BasePath="../ckeditor/" Text='<%# Bind("PageContents") %>'
                            Toolbar="Full" runat="server" Width="650px" Height="141px"></CKEditor:CKEditorControl>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" CommandName="Insert"
                            Text="Create New Page" CssClass="btn btn-warning" ValidationGroup="UP" />
                    </td>
                    <td> 
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
        </InsertItemTemplate>
    </asp:FormView>
    <asp:SqlDataSource ID="sdspages" runat="server" ConnectionString="<%$ ConnectionStrings:CS %>"
        SelectCommand="SELECT * FROM [Pages] WHERE [PageID] = @PageID" DeleteCommand="DELETE FROM [Pages] WHERE [PageID] = @PageID"
        InsertCommand="INSERT INTO [Pages] ([Title], [Heading], [SlugUrl], [MetaKeywords], [MetaDescripton], [MenuPosition], [MenuParent], [ShowOnFrontPage], [ShowInMenu], [ShowInFooter], [Priority],  [PageContents], [PageUrl], [MenuText]) VALUES (@Title, @Heading, @SlugUrl, @MetaKeywords, @MetaDescripton, @MenuPosition, @MenuParent, @ShowOnFrontPage, @ShowInMenu, @ShowInFooter, @Priority, @PageContents, @PageUrl, @MenuText)"
        UpdateCommand="UPDATE [Pages] SET [Title] = @Title, [Heading] = @Heading, [SlugUrl] = @SlugUrl, [MetaKeywords] = @MetaKeywords, [MetaDescripton] = @MetaDescripton, [MenuPosition] = @MenuPosition, [MenuParent] = @MenuParent, [ShowOnFrontPage] = @ShowOnFrontPage, [ShowInMenu] = @ShowInMenu, [ShowInFooter] = @ShowInFooter, [Priority] = @Priority,  [PageContents] = @PageContents, [PageUrl] = @PageUrl, [MenuText] = @MenuText WHERE [PageID] = @PageID">
        <DeleteParameters>
            <asp:Parameter Name="PageID" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="Title" Type="String" />
            <asp:Parameter Name="Heading" Type="String" />
            <asp:Parameter Name="SlugUrl" Type="String" />
            <asp:Parameter Name="MetaKeywords" Type="String" />
            <asp:Parameter Name="MetaDescripton" Type="String" />
            <asp:Parameter Name="MenuPosition" Type="String" />
            <asp:Parameter Name="MenuParent" Type="String" />
            <asp:Parameter Name="ShowOnFrontPage" Type="String" />
            <asp:Parameter Name="ShowInMenu" Type="String" />
            <asp:Parameter Name="ShowInFooter" Type="String" />
            <asp:Parameter Name="Priority" Type="String" />
            <asp:Parameter Name="PageContents" Type="String" />
            <asp:Parameter Name="PageUrl" Type="String" />
            <asp:Parameter Name="MenuText" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="Title" Type="String" />
            <asp:Parameter Name="Heading" Type="String" />
            <asp:Parameter Name="SlugUrl" Type="String" />
            <asp:Parameter Name="MetaKeywords" Type="String" />
            <asp:Parameter Name="MetaDescripton" Type="String" />
            <asp:Parameter Name="MenuPosition" Type="String" />
            <asp:Parameter Name="MenuParent" Type="String" />
            <asp:Parameter Name="ShowOnFrontPage" Type="String" />
            <asp:Parameter Name="ShowInMenu" Type="String" />
            <asp:Parameter Name="ShowInFooter" Type="String" />
            <asp:Parameter Name="Priority" Type="String" />
            <asp:Parameter Name="PageContents" Type="String" />
            <asp:Parameter Name="PageUrl" Type="String" />
            <asp:Parameter Name="MenuText" Type="String" />
            <asp:Parameter Name="PageID" Type="Int32" />
        </UpdateParameters>
        <SelectParameters>
            <asp:QueryStringParameter Name="PageID" QueryStringField="PageID" Type="Int32" />
        </SelectParameters>
    </asp:SqlDataSource>
    <asp:SqlDataSource ID="sdsmenu" runat="server" ConnectionString="<%$ ConnectionStrings:CS %>"
        SelectCommand="SELECT * FROM [Pages]"></asp:SqlDataSource>
  
        </div>
        </section>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptsCPH" runat="Server">
    <script type="text/javascript">
        CKEDITOR.replace('ContentPlaceHolder1_FormView1_CKEditor1', {
            "extraPlugins": "imagebrowser",
            "imageBrowser_listUrl": "/MaryumWelfere/AdminPanel/listimages.ashx",
            "filebrowserImageBrowseUrl": "/MaryumWelfere/AdminPanel/listimages.ashx"
        });
    </script>

</asp:Content>