<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="CreateProject.aspx.cs" Inherits="myeisc_admin_Default2" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <section class="uiifw-layout-section">
                <header class="cf"><b> Create And Edit slideshow  </b> </header>
          <div class="body org ">
          <div>  <p> <asp:Label ID="lbl" runat="server" Font-Size="Large"  Visible="false"></asp:Label></p>
    <asp:FormView ID="FormView1" runat="server" DataKeyNames="id" DefaultMode="Insert" 
        DataSourceID="create_Project" oniteminserted="FormView1_ItemInserted" 
                  onitemupdated="FormView1_ItemUpdated">
        <EditItemTemplate>
             <table>
        <tr>
        <td>  Title:</td>
            <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</td>
            <td> <asp:TextBox ID="titleTextBox" runat="server" Width="225px" Text='<%# Bind("title") %>' />
              <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Font-Size="11px" 
                ErrorMessage="Please Select A Title" ControlToValidate="titleTextBox" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
            
            </td></tr>
        <tr>
        <td>&nbsp;</td>
            <td>
                &nbsp;</td>
            <td></td>
        </tr>
        <tr>
         <td>   Description:</td>
            <td>
                &nbsp;</td>
            <td>
             <CKEditor:CKEditorControl ID="CKEditor1" BasePath="../ckeditor/" Text='<%# Bind("Description") %>'
                            Toolbar="Full" runat="server" Width="650px" Height="141px"></CKEditor:CKEditorControl>
                             <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Font-Size="11px" 
                ErrorMessage="Describe Project" ControlToValidate="CKEditor1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
            
            <%-- <asp:TextBox ID="DescriptionTextBox" runat="server" 
                 />--%>
                 </td></tr>
                 <tr>
        <td>&nbsp;</td>
                     <td>
                         &nbsp;</td>
                     <td></td>
        </tr>
                <tr>
          <td>  Picture:</td>
                    <td>
                        &nbsp;</td>
                    <td>
                       <asp:FileUpload ID="FileUpload1" runat="server" Filename= '<%# Bind("Pic") %>' ></asp:FileUpload>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
                    
                    <%--  <asp:TextBox ID="PicTextBox" runat="server" Text='<%# Bind("Pic") %>' />--%>
                      
                      </td></tr>
           <tr>
        <td>&nbsp;</td>
               <td>
                   &nbsp;</td>
               <td></td>
        </tr>
          <tr>
           <td>  Status:</td>
              <td>
                  &nbsp;</td>
              <td> 
               <asp:DropDownList ID="DropDownList1" style="
    width: 225px;
" Text='<%# Bind("status") %>' runat="server">
                   <asp:ListItem>Completed</asp:ListItem>
                   <asp:ListItem>In Progress</asp:ListItem>
                  </asp:DropDownList>
              
           <%--   <asp:TextBox ID="statusTextBox" runat="server" Text='<%# Bind("status") %>' />--%></td>
           </tr>
            <tr>
        <td>&nbsp;</td>
                <td>
                    &nbsp;</td>
                <td></td>
        </tr>
           <tr>
            <td></td>
               <td>
                   &nbsp;</td>
               <td>
                
                  <asp:LinkButton ID="UpdateButton" runat="server" CausesValidation="True" CssClass="btn btn-warning" ValidationGroup="project" 
                CommandName="Update" Text="Update" />
            &nbsp;<asp:LinkButton ID="UpdateCancelButton" runat="server" CssClass="btn btn-danger" 
                CausesValidation="False" CommandName="Cancel" Text="Cancel" />
                
                </td>
        </tr>
        
        </table>
          
        </EditItemTemplate>
        <InsertItemTemplate>
        <table>
        <tr>
        <td>  Title:</td>
            <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</td>
            <td> <asp:TextBox ID="titleTextBox" runat="server" Width="225px" Text='<%# Bind("title") %>' />
              <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Font-Size="11px" 
                ErrorMessage="Please Select A Title" ControlToValidate="titleTextBox" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
            
            </td></tr>
        <tr>
        <td>&nbsp;</td>
            <td>
                &nbsp;</td>
            <td></td>
        </tr>
        <tr>
         <td>   Description:</td>
            <td>
                &nbsp;</td>
            <td>
             <CKEditor:CKEditorControl ID="CKEditor1" BasePath="../ckeditor/" Text='<%# Bind("Description") %>'
                            Toolbar="Full" runat="server" Width="650px" Height="141px"></CKEditor:CKEditorControl>
                             <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Font-Size="11px" 
                ErrorMessage="Describe Project" ControlToValidate="CKEditor1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
            
            <%-- <asp:TextBox ID="DescriptionTextBox" runat="server" 
                 />--%>
                 </td></tr>
                 <tr>
        <td>&nbsp;</td>
                     <td>
                         &nbsp;</td>
                     <td></td>
        </tr>
                <tr>
          <td>  Picture:</td>
                    <td>
                        &nbsp;</td>
                    <td>
                       <asp:FileUpload ID="FileUpload1" runat="server" Filename= '<%# Bind("Pic") %>' ></asp:FileUpload>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
                    
                    <%--  <asp:TextBox ID="PicTextBox" runat="server" Text='<%# Bind("Pic") %>' />--%>
                      
                      </td></tr>
           <tr>
        <td>&nbsp;</td>
               <td>
                   &nbsp;</td>
               <td></td>
        </tr>
          <tr>
           <td>  Status:</td>
              <td>
                  &nbsp;</td>
              <td> 
               <asp:DropDownList ID="DropDownList1" style="
    width: 225px;
" Text='<%# Bind("status") %>' runat="server">
                   <asp:ListItem>Completed</asp:ListItem>
                   <asp:ListItem>In Progress</asp:ListItem>
                  </asp:DropDownList>
              
           <%--   <asp:TextBox ID="statusTextBox" runat="server" Text='<%# Bind("status") %>' />--%></td>
           </tr>
            <tr>
        <td>&nbsp;</td>
                <td>
                    &nbsp;</td>
                <td></td>
        </tr>
           <tr>
            <td></td>
               <td>
                   &nbsp;</td>
               <td> <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" CssClass="btn btn-warning" ValidationGroup="project"
                CommandName="Insert" Text="Submit" />
            &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" CssClass="btn btn-danger" 
                CausesValidation="False" CommandName="Cancel" Text="Cancel" /></td>
        </tr>
        
        </table>
           
        </InsertItemTemplate>
    </asp:FormView>
    </div></div></section>
    <asp:SqlDataSource ID="create_Project" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        DeleteCommand="DELETE FROM [Projects] WHERE [id] = @id" 
        InsertCommand="INSERT INTO [Projects] ([title], [Description], [Pic], [status]) VALUES (@title, @Description, @Pic, @status)" 
        SelectCommand="SELECT * FROM [Projects] WHERE [id] = @id" 
        UpdateCommand="UPDATE [Projects] SET [title] = @title, [Description] = @Description, [Pic] = @Pic, [status] = @status WHERE [id] = @id">
        <DeleteParameters>
            <asp:Parameter Name="id" Type="Int32" />
        </DeleteParameters>
           <SelectParameters>
            <asp:QueryStringParameter Name="id" QueryStringField="PageID" Type="Int32" />
        </SelectParameters>
        <InsertParameters>
            <asp:Parameter Name="title" Type="String" />
            <asp:Parameter Name="Description" Type="String" />
            <asp:Parameter Name="Pic" Type="String" />
            <asp:Parameter Name="status" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="title" Type="String" />
            <asp:Parameter Name="Description" Type="String" />
            <asp:Parameter Name="Pic" Type="String" />
            <asp:Parameter Name="status" Type="String" />
            <asp:Parameter Name="id" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

