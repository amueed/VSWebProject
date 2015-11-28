<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="AllNews.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
All News
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<section class="uiifw-layout-section">
                <header class="cf"><b>   All Projects  </b> 
                
               
         <asp:HyperLink ID="HyperLink1" runat="server" style="float: right;
margin-top: -7px;
margin-right: -10px;"  CssClass="btn btn-warning"
          NavigateUrl="News.aspx">Create News</asp:HyperLink>
         
                
                
                </header>
          <div class="body org ">
          <div>
    <div>
      <div align="left">
          <asp:Label ID="lbl" runat="server" Visible="false"></asp:Label></div>
    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" AlternatingRowStyle-CssClass="alt" PagerStyle-CssClass="pgr" CssClass="Grid" Width="100%" 
        DataKeyNames="id" DataSourceID="SqlDataSource1">
        <Columns>
          <asp:TemplateField HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel4" runat="server" ImageUrl='<%# Eval("Pic", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
            <%--<asp:BoundField DataField="id" HeaderText="id" InsertVisible="False" 
                ReadOnly="True" SortExpression="id" />
            <asp:BoundField DataField="pic" HeaderText="pic" SortExpression="pic" />--%>
            <asp:BoundField DataField="contentent" HeaderText="contentent" 
                SortExpression="contentent" />
                  <asp:TemplateField HeaderStyle-Width="30px">
                <ItemTemplate>
                  <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="return confirm('Are you sure you  want to delete this record?');"
                        CommandName="Delete"  ControlStyle-CssClass="btn-danger btn">Delete  </asp:LinkButton>
                </ItemTemplate>
                </asp:TemplateField>
        </Columns>
    </asp:GridView>
    </div></div></div></section>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        SelectCommand="SELECT * FROM [News]" 
        DeleteCommand="DELETE FROM [News] WHERE [id] = @id" 
        InsertCommand="INSERT INTO [News] ([pic], [contentent]) VALUES (@pic, @contentent)" 
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

