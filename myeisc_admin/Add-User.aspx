<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true"
    CodeFile="Add-User.aspx.cs" Inherits="AdminPanel_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
   
      <script>
          $(function () {
              $('#ContentPlaceHolder1_FormView1_UserNameTextBox').keyup(function () {
                  $val = $(this).val();
                  $('#ContentPlaceHolder1_FormView1_TextBox2').val($val.toLowerCase().replace(/ /g, "_").replace(/&/g, "and").replace(/\W/g, "").replace(/_/g, "-"));
              });
          });
</script>
</asp:Content>
<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>
<asp:Content ID="title" ContentPlaceHolderID="title" runat="Server">

Create/Edit User
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
     <%--  <div class="uifw-message information "><p class="uifw-message-header">Manage Users</p><p>Here you can manage Users.</p></div> --%>
      
    <section class="uiifw-layout-section">
                <header class="cf"><b> Create And Edit User  </b> </header>
          <div class="body org ">
          <div>  <p> <asp:Label ID="lbl" runat="server" Font-Size="Large"  Visible="false"></asp:Label></p>
           
    <asp:FormView ID="FormView1" runat="server" DataKeyNames="UserID" DataSourceID="sdsUsers"
        DefaultMode="Insert"  oniteminserted="FormView1_ItemInserted" height="545px"  Width="930px"
        onitemupdated="FormView1_ItemUpdated">
        <EditItemTemplate>
             <table class="user">
              <tr><td></td><td>
                 <asp:ValidationSummary ID="ValidationSummary1" runat="server" DisplayMode="SingleParagraph" 
                        HeaderText="<p class='uifw-message-header'>Errors</p>" ValidationGroup="UP" CssClass="uifw-message error"></asp:ValidationSummary>
                        
                </td></tr>
                <tr>
                    <td>
                        <b>User Name</b>
                    </td>
                    <td class="style9">
  <asp:TextBox ID="UserNameTextBox" runat="server" Text='<%# Bind("UserName") %>' Width="614px" Height="32px" CssClass="required frm-field"/>
                           <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ControlToValidate="UserNameTextBox"
                            ValidationGroup="UP" runat="server" ErrorMessage="Please Enter Valid User Name." ForeColor="#FF3300"
                            Enabled="True" Font-Size="Small">*</asp:RequiredFieldValidator>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <b>Slug</b>
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox2" runat="server" Text='<%# Bind("Slug") %>' Width="614px" Height="32px"/>
                   </td>
                </tr>
                <tr>
                    <td>
                        <b>Password</b>
                    </td>
                    <td>
                        <asp:TextBox ID="UserPasswordTextBox" runat="server" TextMode="Password" Text='<%# Bind("Password") %>'
                           Width="614px" Height="32px" placeholder="Password contains atleast  one digit And  One Capital character length at least 6  " />
                            <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" 
                          ValidationGroup="UP" ErrorMessage="Please Enter Valid Passsword." 
                            ControlToValidate="UserPasswordTextBox" ForeColor="#FF3300"
                             ValidationExpression="((?=.*\d)(?=.*[a-z])(?=.*[A-Z@#$%]).{6,20})" 
                            Display="Dynamic" >*</asp:RegularExpressionValidator>
                         <asp:RequiredFieldValidator ID="RequiredFieldValidator3" ControlToValidate="UserPasswordTextBox"
                           ValidationGroup="UP" runat="server" ErrorMessage="Please Enter Valid Password."
                            ForeColor="#FF3300" Enabled="True" Font-Size="Small" Display="Dynamic">*</asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr>
                    <td class="style6">
                        <b>Confirm Password</b>
                    </td>
                    <td class="style9">
                        <asp:TextBox ID="TextBox1" runat="server" Width="614px" Height="32px" ControlToCompare="TextBox1"
                            TextMode="Password"/>
                        <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage="Not Match!"
                            ValidationGroup="UP" ControlToCompare="UserPasswordTextBox" ControlToValidate="TextBox1"
                            ForeColor="#FF3300" Enabled="True" Font-Size="Small" Display="Dynamic">*</asp:CompareValidator>
                        
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" ControlToValidate="TextBox1"
                           ValidationGroup="UP" runat="server" ErrorMessage="Please Enter Confirm Password."
                            ForeColor="#FF3300" Enabled="True" Font-Size="Small" Display="Dynamic">*</asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr>
                    <td class="style6">
                        <b>Mobile</b>
                    </td>
                    <td class="style9">
                        <asp:TextBox ID="MobileTextBox" runat="server" MaxLength="11" Text='<%# Bind("Mobile") %>'
                           Width="614px" Height="32px" />
                        <asp:RegularExpressionValidator ID="RegularExpressionValidator2" ControlToValidate="MobileTextBox"
                            runat="server" ErrorMessage="Please Enter Valid Mobile number." ValidationGroup="UP" ValidationExpression="^\d+$"
                            ForeColor="#FF3300">*</asp:RegularExpressionValidator>
                      
                    </td> 
                </tr>
                <tr>
                    <td class="style6">
                        <b>Email</b>
                    </td>
                    <td class="style9">
                        <asp:TextBox ID="EmailTextBox" runat="server" Text='<%# Bind("Email") %>' Width="614px" Height="32px" />
                        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="Please Enter Valid  Email."
                            ControlToValidate="EmailTextBox" ValidationGroup="In" ForeColor="#FF3300" Font-Size="Small"
                            ValidationExpression="[\w+-]+(?:\.[\w+-]+)*@[\w+-]+(?:\.[\w+-]+)*(?:\.[a-zA-Z]{2,4})">*</asp:RegularExpressionValidator>
                          </td>
                </tr>
                <tr>
                    <td class="style6">
                        
                    </td>
                    <td class="style9">
                      <h2 style="margin-bottom:8px;">Description</h2>  
                        <CKEditor:CKEditorControl ID="CKEditor1" BasePath="/ckeditor/" Text='<%# Bind("Comments") %>'
                            Toolbar="Basic" runat="server" Width="606px" Height="141px"></CKEditor:CKEditorControl>
                    </td>
                </tr>
                <tr>
                    <td class="style6">
                    </td>
                    <td class="style9">
                        <asp:LinkButton ID="UpdateButton" runat="server" CausesValidation="True" CommandName="Update"
                            Text="Save User Info " ValidationGroup="UP" CssClass="btn btn-warning"/> 
                             &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" CausesValidation="False"
                            CommandName="Cancel" Text="Cancel"  CssClass="btn-danger btn"/>
                    </td>
                </tr>
               
            </table>
        </EditItemTemplate>
        <InsertItemTemplate>
          <table class="user">
           <tr><td></td><td>
                <%--<div class="uifw-message error">
    			<p class="uifw-message-header">Error</p>
    			<p>The email address provided is not valid. Please go back and try again.</p>
    		</div>--%>
                <asp:ValidationSummary ID="ValidationSummary1" runat="server" DisplayMode="SingleParagraph" 
                        HeaderText="<p class='uifw-message-header'>Errors</p>" ValidationGroup="In" CssClass="uifw-message error"></asp:ValidationSummary>
                        <div class="left"><asp:Label ID="lbl" runat="server" Font-Size="Large" CssClass="uifw-message done" Visible="false"></asp:Label></div>
                </td></tr>
                <tr>
                    <td>
                        <b>User Name</b>
                    </td>
                    <td class="style9">
                        <asp:TextBox ID="UserNameTextBox" runat="server" Text='<%# Bind("UserName") %>' Width="614px" Height="32px"/>
                           <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ControlToValidate="UserNameTextBox"
                            ValidationGroup="In" runat="server" ErrorMessage="Please Enter Valid User Name." ForeColor="#FF3300"
                            Enabled="True" Font-Size="Small">*</asp:RequiredFieldValidator>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <b>Slug</b>
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox2" runat="server" Text='<%# Bind("Slug") %>' Width="614px" Height="32px"/>
                   </td>
                </tr>
                <tr>
                    <td>
                        <b>Password</b>
                    </td>
                    <td>
                        <asp:TextBox ID="UserPasswordTextBox" runat="server" TextMode="Password" Text='<%# Bind("Password") %>'
                           Width="614px" Height="32px" placeholder="Password contains atleast  one digit And  One Capital character length at least 6  " />
                            <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" 
                          ValidationGroup="In" ErrorMessage="Please Enter Valid Passsword." 
                            ControlToValidate="UserPasswordTextBox" ForeColor="#FF3300"
                             ValidationExpression="((?=.*\d)(?=.*[a-z])(?=.*[A-Z@#$%]).{6,20})" 
                            Display="Dynamic" >*</asp:RegularExpressionValidator>
                         <asp:RequiredFieldValidator ID="RequiredFieldValidator3" ControlToValidate="UserPasswordTextBox"
                           ValidationGroup="In" runat="server" ErrorMessage="Please Enter Valid Password"
                            ForeColor="#FF3300" Enabled="True" Font-Size="Small" Display="Dynamic">*</asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr>
                    <td class="style6">
                        <b>Confirm Password</b>
                    </td>
                    <td class="style9">
                        <asp:TextBox ID="TextBox1" runat="server" Width="614px" Height="32px" ControlToCompare="TextBox1"
                            TextMode="Password"/>
                        <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage="Not Match!"
                            ValidationGroup="In" ControlToCompare="UserPasswordTextBox" ControlToValidate="TextBox1"
                            ForeColor="#FF3300" Enabled="True" Font-Size="Small" Display="Dynamic">*</asp:CompareValidator>
                        
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" ControlToValidate="TextBox1"
                           ValidationGroup="In" runat="server" ErrorMessage="Please Enter Confirm Password."
                            ForeColor="#FF3300" Enabled="True" Font-Size="Small" Display="Dynamic">*</asp:RequiredFieldValidator>
                    </td>
                </tr>
                <tr>
                    <td class="style6">
                        <b>Mobile</b>
                    </td>
                    <td class="style9">
                        <asp:TextBox ID="MobileTextBox" runat="server" MaxLength="11" Text='<%# Bind("Mobile") %>'
                           Width="614px" Height="32px" />
                        <asp:RegularExpressionValidator ID="RegularExpressionValidator2" ControlToValidate="MobileTextBox"
                            runat="server" ErrorMessage="Please Enter Valid Mobile number" ValidationGroup="In" ValidationExpression="^\d+$"
                            ForeColor="#FF3300">*</asp:RegularExpressionValidator>
                      
                    </td> 
                </tr>
                <tr>
                    <td class="style6">
                        <b>Email</b>
                    </td>
                    <td class="style9">
                        <asp:TextBox ID="EmailTextBox" runat="server" Text='<%# Bind("Email") %>' Width="614px" Height="32px" />
                        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="Please Enter Valid  Email."
                            ControlToValidate="EmailTextBox" ValidationGroup="In" ForeColor="#FF3300" Font-Size="Small"
                            ValidationExpression="[\w+-]+(?:\.[\w+-]+)*@[\w+-]+(?:\.[\w+-]+)*(?:\.[a-zA-Z]{2,4})">*</asp:RegularExpressionValidator>
                          </td>
                </tr>
                <tr>
                    <td class="style6">
                        
                    </td>
                    <td class="style9">
                      <span style="font-size:20px" class="amount">Description</span></br>
                        <CKEditor:CKEditorControl ID="CKEditor1" BasePath="/ckeditor/" Text='<%# Bind("Comments") %>'
                            Toolbar="Basic" runat="server" Width="606px" Height="141px"></CKEditor:CKEditorControl>
                    </td>
                </tr>
                <tr>
                    <td class="style5">
                    </td>
                    <td class="style8">
                        <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" CommandName="Insert"
                            Text="Create New User" CssClass="btn btn-warning" ValidationGroup="In"/>
                        &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" CausesValidation="False"
                            CommandName="Cancel" Text="Cancel"  CssClass="btn-danger btn"/>
                    </td>
                    
                </tr>
               
            </table>
        </InsertItemTemplate>
    </asp:FormView>
    <asp:SqlDataSource ID="sdsUsers" runat="server" ConnectionString="<%$ ConnectionStrings:CS %>"
        DeleteCommand="DELETE FROM [Users] WHERE [UserID] = @UserID" 
        InsertCommand="p__User__Insert"   InsertCommandType="StoredProcedure"
        SelectCommand="SELECT * FROM [Users] WHERE ([UserID] = @UserID)"
        UpdateCommand="p__Users__Update"  UpdateCommandType = "StoredProcedure">
        <DeleteParameters>
            <asp:Parameter Name="UserID" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="UserName" Type="String" />
            <asp:Parameter Name="Password" Type="String" />
            <asp:Parameter Name="Mobile" Type="String" />
            <asp:Parameter Name="Email" Type="String" />
             <asp:Parameter Name="Slug" Type="String" />
            <asp:Parameter Name="Comments" Type="String" />
        </InsertParameters>
        <SelectParameters>
            <asp:QueryStringParameter Name="UserID" QueryStringField="UserID" Type="Int32" />
        </SelectParameters>
        <UpdateParameters>
            <asp:Parameter Name="UserName" Type="String" />
            <asp:Parameter Name="Password" Type="String" />
            <asp:Parameter Name="Mobile" Type="String" />
            <asp:Parameter Name="Comments" Type="String" />
             <asp:Parameter Name="Slug" Type="String" />
            <asp:Parameter Name="UserID" Type="Int32" />
        </UpdateParameters>
       
    </asp:SqlDataSource> 
    
      </div>
      </div>
      </section>
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