<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="News.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
Create News
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
  <section class="uiifw-layout-section">
                <header class="cf"><b> Create News </b> </header>
          <div class="body org ">
          <div>  <p> <asp:Label ID="lbl" runat="server" Font-Size="Large"  Visible="false"></asp:Label></p>
    <asp:FormView ID="FormView1" runat="server" DataKeyNames="id" DefaultMode="Insert" 
        DataSourceID="SqlDataSource1" oniteminserted="FormView1_ItemInserted">
      
        <InsertItemTemplate>
        <table>
        <tr>
        <td>  Realted Picture:</td>
        <td>   <asp:FileUpload ID="FileUpload1" runat="server" Filename= '<%# Bind("Pic") %>' ></asp:FileUpload>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="news"></asp:RequiredFieldValidator></td>
        </tr>
            <tr>
                <td>
                    &nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
         <tr>
        <td>News Contentent:</td>
        <td> <asp:TextBox ID="contententTextBox" runat="server" TextMode="MultiLine" 
                Text='<%# Bind("contentent") %>' />
                
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Font-Size="11px" 
                ErrorMessage="Content Is REquired" ControlToValidate="contententTextBox" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="news"></asp:RequiredFieldValidator>
                
                </td>
        </tr>
            <tr>
                <td>
                    &nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
         <tr>
        <td></td>
        <td>  <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" CssClass="btn btn-warning" ValidationGroup="news"  
                CommandName="Insert" Text="Insert" />
            &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" CssClass="btn btn-danger" 
                CausesValidation="False" CommandName="Cancel" Text="Cancel" /></td>
        </tr>
        </table>
        </InsertItemTemplate>
    </asp:FormView>

    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        DeleteCommand="DELETE FROM [News] WHERE [id] = @id" 
        InsertCommand="INSERT INTO [News] ([pic], [contentent]) VALUES (@pic, @contentent)" 
        SelectCommand="SELECT * FROM [News]" 
        UpdateCommand="UPDATE [News] SET [pic] = @pic, [contentent] = @contentent WHERE [id] = @id">
        <DeleteParameters>
            <asp:Parameter Name="id" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="pic" Type="String" />
            <asp:Parameter Name="contentent" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="pic" Type="String" />
            <asp:Parameter Name="contentent" Type="String" />
            <asp:Parameter Name="id" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

