<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="Logo_title.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
LOGO AND PAGE TITLE
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
  <%--  <table>
    <tr>
    
    <td>Logo</td>
    <td> <asp:FileUpload ID="FileUpload1" runat="server" /></td>
    </tr>
    <tr>
    <td>&nbsp;&nbsp; &nbsp;</td>
    <td> </td>
    </tr>
    <tr>
    <td>Title</td>
    <td>
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox></td>
    </tr>
    </table>--%>
    <asp:FormView ID="FormView1" runat="server" DataKeyNames="id" DefaultMode="Edit" 
        DataSourceID="SqlDataSource1" onitemupdated="FormView1_ItemUpdated">
        <EditItemTemplate>
        <table>
        <tr>
        <td> <asp:Image ID="PhotosLabel4" runat="server" ImageUrl='<%# Eval("Logo", "~/Uploads/{0}") %>' Width="100px" Height="50px" /></td>
        <td></td>
        </tr>
        <tr>
        <td> Logo:</td>
        <td>  <asp:FileUpload ID="FileUpload1" runat="server" Filename= '<%# Bind("Logo") %>' ></asp:FileUpload>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator></td>
        </tr>
        <tr>
        <td>  Page Title:</td>
        <td>  <asp:TextBox ID="Page_titleTextBox" runat="server" 
                Text='<%# Bind("Page_title") %>' /></td>
        </tr>
        </table>
           
            <asp:LinkButton ID="UpdateButton" CssClass="btn btn-warning" runat="server"  ValidationGroup="project" CausesValidation="True" 
                CommandName="Update" Text="Update" />
            &nbsp;<asp:LinkButton ID="UpdateCancelButton" CssClass="btn btn-danger" runat="server" 
                CausesValidation="False" CommandName="Cancel" Text="Cancel" />
        </EditItemTemplate>
        <InsertItemTemplate>
            Logo:
              <asp:FileUpload ID="FileUpload1" runat="server" Filename= '<%# Bind("Logo") %>' ></asp:FileUpload>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
           <%-- <asp:TextBox ID="LogoTextBox" runat="server" Text='<%# Bind("Logo") %>' />--%>
            <br />
            Page_title:
            <asp:TextBox ID="Page_titleTextBox" runat="server" 
                Text='<%# Bind("Page_title") %>' />
            <br />

            <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" 
                CommandName="Insert" Text="Insert" />
            &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" 
                CausesValidation="False" CommandName="Cancel" Text="Cancel" />
        </InsertItemTemplate>
        <ItemTemplate>
            id:
            <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
            <br />
            Logo:
            <asp:Label ID="LogoLabel" runat="server" Text='<%# Bind("Logo") %>' />
            <br />
            Page_title:
            <asp:Label ID="Page_titleLabel" runat="server" 
                Text='<%# Bind("Page_title") %>' />
            <br />

        </ItemTemplate>
    </asp:FormView>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        SelectCommand="SELECT * FROM [logo_title]" 
        DeleteCommand="DELETE FROM [logo_title] WHERE [id] = @id" 
        InsertCommand="INSERT INTO [logo_title] ([Logo], [Page_title]) VALUES (@Logo, @Page_title)" 
        UpdateCommand="UPDATE [logo_title] SET [Logo] = @Logo, [Page_title] = @Page_title WHERE [id] = @id">
        <DeleteParameters>
            <asp:Parameter Name="id" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="Logo" Type="String" />
            <asp:Parameter Name="Page_title" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="Logo" Type="String" />
            <asp:Parameter Name="Page_title" Type="String" />
            <asp:Parameter Name="id" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

