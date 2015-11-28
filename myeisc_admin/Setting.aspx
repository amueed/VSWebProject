<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true"
    CodeFile="Setting.aspx.cs" Inherits="AdminPanel_Default2" %>

<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="title" ContentPlaceHolderID="title" runat="Server">

 Website Setting
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
   <%-- <div class="uifw-message information ">
        <p class="uifw-message-header">
           </p>
        <p>
            Personalise Your Website.</p>
    </div>--%>
    <asp:Label ID="lbl" runat="server" Visible="false"></asp:Label>
    <asp:ValidationSummary ID="ValidationSummary1" runat="server" DisplayMode="SingleParagraph"
        HeaderText="<p class='uifw-message-header'>Errors</p>" ValidationGroup="UP" CssClass="uifw-message error">
    </asp:ValidationSummary>
    <asp:FormView ID="FormView1" runat="server" DataSourceID="sdssetting" DefaultMode="Edit"
        Width="100%" DataKeyNames="WebsiteID" OnItemUpdated="FormView1_ItemUpdated">
        <EditItemTemplate>
      <%--      <section class="uiifw-layout-section">
   <header class="cf"><b>About</b> </header>  <div class="body org ">   <div>   <h2 style="margin-bottom:8px;">Name</h2>
  <asp:TextBox ID="WebsiteNameTextbox" runat="server"   Text='<%# Bind("WebsiteName") %>' width="322px" /> <br /><br /> 
     <h2 style="margin-bottom:8px;">Owner</h2>
      <asp:TextBox ID="WebsiteOwnerTextBox" runat="server" Text='<%# Bind("WebsiteOwner") %>' width="322px" />  <br /><br /> 
     <h2 style="margin-bottom:8px;">Address First</h2>
      <asp:TextBox ID="TextBox1" runat="server" Text='<%# Bind("AddressOne") %>' width="555px" /> 
      <br /><br /> 
      <h2 style="margin-bottom:8px;">Addresss Second</h2>
       <asp:TextBox ID="TextBox2" runat="server" Text='<%# Bind("AddressTwo") %>' width="555px" /> 
      <br /><br /> 
      <br /><br /> </div></div></section>--%>
            <br />
            <br />
            <section class="uiifw-layout-section">
    <header class="cf"><b>Follow Us</b> </header>
          <div class="body org ">
          <div> 
  <b>FaceBook</b> <br /><br />   <asp:TextBox ID="FaceBookTextBox" runat="server"   Text='<%# Bind("FaceBook") %>' width="322px" /> 
   <br /> <br />    <b>Twitter</b><br /><br />    <asp:TextBox ID="TwitterTextBox" runat="server"   Text='<%# Bind("Twitter") %>' width="322px" />
    <br /><br /> <b>Google Plus</b> <br /><br />   <asp:TextBox ID="PlusTextBox" runat="server" Text='<%# Bind("Plus") %>' width="322px" />
     <br /><br />  <b>Skype</b><br /><br /> <asp:TextBox ID="LinkdinTextBox" runat="server" Text='<%# Bind("Linkdin") %>' width="322px"  /> <br /><br />  
     <b>Blog</b> <br /><br />  <asp:TextBox ID="BlogTextBox" runat="server"  width="322px"  Text='<%# Bind("Blog") %>' /> <br /> <br /> 
 </div></div></section>
            <br />
            </div>
            <section class="uiifw-layout-section">
    <header class="cf"><b>Contacts  </b> </header>
          <div class="body org ">
          <div>       
    <div style="border: 0px solid #182227; width:674px;">
    <table class="user">
    
    <tr><td><b> Mobile</b></td>  <td><asp:TextBox ID="MobileTextBox"
     runat="server" Text='<%# Bind("Mobile") %>' Width="325px" /> 
     
       </td></tr>
       <tr><td><b>Phone 1</b></td><td> <asp:TextBox ID="PhoneTextBox" 
        runat="server" Text='<%# Bind("Phone") %>'  Width="325px"/>
          
                         
        
        </td></tr>
        <tr><td> <b> Phone 2</b></td><td>    <asp:TextBox ID="FaxTextBox"
        runat="server" Text='<%# Bind("Fax") %>' Width="325px" /></td></tr> 
        <tr>
    <td> <b>Email</b></td><td>  
        <asp:TextBox ID="EmailTextBox" runat="server" Text='<%# Bind("Email") %>' Width="325px" />
        <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" ErrorMessage="Please Enter Valid  Email."
         ControlToValidate="EmailTextBox" ValidationGroup="UP" ForeColor="#FF3300" Font-Size="Small"
      ValidationExpression="[\w+-]+(?:\.[\w+-]+)*@[\w+-]+(?:\.[\w+-]+)*(?:\.[a-zA-Z]{2,4})" Text="*">*</asp:RegularExpressionValidator>
        </td></tr>
        <tr><td><b>Email 2</b></td><td>  <asp:TextBox ID="SkypeTextBox" 
       runat="server" Text='<%# Bind("Skype") %>'  Width="325px"/>
        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="Please Enter Valid  Email."
         ControlToValidate="SkypeTextBox" ValidationGroup="UP" ForeColor="#FF3300" Font-Size="Small"
      ValidationExpression="[\w+-]+(?:\.[\w+-]+)*@[\w+-]+(?:\.[\w+-]+)*(?:\.[a-zA-Z]{2,4})" Text="*">*</asp:RegularExpressionValidator>
       </td></tr>
   </table> 
  </div></div></section>
            </div> </td></tr>
            <tr>
                <td>
                    <table>
               <%--         <section class="uiifw-layout-section">
    <header class="cf"><b>Website URL  </b> </header>
            <div class="body org ">
         
          <b>Student Login URL</b>
          <br /><br />
           <asp:TextBox ID="URLTextBox"  runat="server" Text='<%# Bind("URL") %>' width="422px" />  <br /><br />
          <b>Teacher login URL</b> <br /><br />
               <asp:TextBox ID="studentUrlTextBox"  runat="server" Text='<%# Bind("PageView") %>' width="422px" />  
           
                
           <div>
        <br /><br />
         </div></div></section>--%>
                        <br />
                        <br />
                        <section class="uiifw-layout-section">
    <header class="cf"><b>Offline Message  </b> </header>
          <div class="body org ">
          <div>       
            <CKEditor:CKEditorControl ID="CKEditor1" BasePath="../ckeditor/"   
            Text='<%# Bind("OfflineMessage") %>'  Toolbar="Basic"  
            runat="server" Width="588px" Height="141px"></CKEditor:CKEditorControl>
            <br /><br />
            
                        <h1 class="uifw-message-header">
                            <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="True" CommandName="Update"
                                Text="Update setting" CssClass="btn btn-warning" ValidationGroup="UP" />
                        </h1>
                        </div></div></section>
        </EditItemTemplate>
    </asp:FormView>
    <asp:SqlDataSource ID="sdssetting" runat="server" ConnectionString="<%$ ConnectionStrings:CS %>"
        SelectCommand="SELECT * FROM [Websites]" DeleteCommand="DELETE FROM [Websites] WHERE [WebsiteID] = @WebsiteID"
        UpdateCommand="UPDATE [Websites] SET [WebsiteName] = @WebsiteName, [WebsiteOwner] = @WebsiteOwner,   [FaceBook] = @FaceBook, [Twitter] = @Twitter, [Plus] = @Plus, [Linkdin] = @Linkdin, [Blog] = @Blog, [Email] = @Email, [Mobile] = @Mobile, [Phone] = @Phone, [Fax] = @Fax  ,[AddressOne] = @AddressOne ,[AddressTwo]= @AddressTwo ,[OfflineMessage] = @OfflineMessage, [URL] = @URL, [Skype] = @Skype WHERE [WebsiteID] = @WebsiteID">
        <DeleteParameters>
            <asp:Parameter Name="WebsiteID" Type="Int32" />
        </DeleteParameters>
        <UpdateParameters>
            <asp:Parameter Name="WebsiteName" Type="String" />
            <asp:Parameter Name="WebsiteOwner" Type="String" />
            <asp:Parameter Name="FaceBook" Type="String" />
            <asp:Parameter Name="Twitter" Type="String" />
            <asp:Parameter Name="Plus" Type="String" />
            <asp:Parameter Name="Linkdin" Type="String" />
            <asp:Parameter Name="Blog" Type="String" />
            <asp:Parameter Name="Email" Type="String" />
            <asp:Parameter Name="Mobile" Type="String" />
            <asp:Parameter Name="Phone" Type="String" />
            <asp:Parameter Name="Fax" Type="String" />
            <asp:Parameter Name="IsOffline" Type="Object" />
            <asp:Parameter Name="OfflineMessage" Type="String" />
            <asp:Parameter Name="URL" Type="String" />
            <asp:Parameter Name="Skype" Type="String" />
            <asp:Parameter Name="WebsiteID" Type="Int32" />
            <asp:Parameter Name="AddressOne" Type="String" />
            <asp:Parameter Name="AddressTwo" Type="String" />
        </UpdateParameters>
    </asp:SqlDataSource>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptsCPH" runat="Server">
     <script type="text/javascript">
        CKEDITOR.replace('ContentPlaceHolder1_FormView1_CKEditor1', {
            "extraPlugins": "imagebrowser",
            "imageBrowser_listUrl": "/AdminPanel/listimages.ashx",
            "filebrowserImageBrowseUrl": "/AdminPanel/listimages.ashx"
        });
    </script>
</asp:Content>