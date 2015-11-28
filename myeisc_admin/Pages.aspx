<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true"
    CodeFile="Pages.aspx.cs" Inherits="AdminPanel_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="title" ContentPlaceHolderID="title" runat="Server">

Manage Webpages
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
  <%--  <div><div class="uifw-message information "><p class="uifw-message-header">Here you can manage webpages.</p></div>--%>
   <section class="uiifw-layout-section">
                <header class="cf"><b>   All Pages  </b> 
                
               
         <asp:HyperLink ID="HyperLink1" runat="server" style="float: right;
margin-top: -7px;
margin-right: -10px;"  CssClass="btn btn-warning"
          NavigateUrl="Create-new-page.aspx">Create New Page</asp:HyperLink>
         
                
                
                </header>
          <div class="body org ">
          <div>
    <div>
      <div align="left">
          <asp:Label ID="lbl" runat="server" Visible="false"></asp:Label></div>
          
    <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False" CssClass="Grid"
        DataKeyNames="PageID" DataSourceID="sdspages" class="webpages ui-sortable" RowStyle-Height="40px" AlternatingRowStyle-CssClass="alt" PagerStyle-CssClass="pgr" 
            Width="100%" Height="50px" onrowdeleted="GridView1_RowDeleted">
        <Columns>     
            <asp:BoundField DataField="Priority" HeaderText="Priority" SortExpression="Priority"/>
              <asp:BoundField DataField="Title" HeaderText="Title" SortExpression="Title" ItemStyle-Width="45%" />  
            <asp:BoundField DataField="MenuPosition" HeaderText="Menu Position" SortExpression="MenuPosition"/>
                 
            <asp:BoundField DataField="ModifiedDate" HeaderText="Modified On" SortExpression="ModifiedDate" />
            <asp:TemplateField HeaderStyle-Width="35px">
                <ItemTemplate>
                    <asp:LinkButton ID="LinkButton1" runat="server"
                     OnClientClick="return confirm('Are you sure you  want to delete this record?');"
                        CommandName="Delete" ControlStyle-CssClass="btn-danger btn">Delete  </asp:LinkButton>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:HyperLinkField DataNavigateUrlFields="PageID"
             DataNavigateUrlFormatString="Create-new-page.aspx?PageID={0}"
                Text="Edit" ControlStyle-CssClass="btn btn-warning" />
        </Columns>
        
    </asp:GridView>
    <asp:SqlDataSource ID="sdspages" runat="server" ConnectionString="<%$ ConnectionStrings:CS %>"
        DeleteCommand="DELETE FROM [Pages] WHERE [PageID] = @PageID" InsertCommand="INSERT INTO [Pages] ([Title], [Heading], [SlugUrl], [MetaKeywords], [MetaDescripton], [MenuPosition], [MenuParent], [ShowOnFrontPage], [ShowInMenu], [ShowInFooter], [Priority], [CreationDate], [ModifiedDate], [PageContents], [PageUrl], [MenuText]) VALUES (@Title, @Heading, @SlugUrl, @MetaKeywords, @MetaDescripton, @MenuPosition, @MenuParent, @ShowOnFrontPage, @ShowInMenu, @ShowInFooter, @Priority, @CreationDate, @ModifiedDate, @PageContents, @PageUrl, @MenuText)"
        SelectCommand="SELECT * FROM [Pages]" UpdateCommand="UPDATE [Pages] SET [Title] = @Title, [Heading] = @Heading, [SlugUrl] = @SlugUrl, [MetaKeywords] = @MetaKeywords, [MetaDescripton] = @MetaDescripton, [MenuPosition] = @MenuPosition, [MenuParent] = @MenuParent, [ShowOnFrontPage] = @ShowOnFrontPage, [ShowInMenu] = @ShowInMenu, [ShowInFooter] = @ShowInFooter, [Priority] = @Priority, [CreationDate] = @CreationDate, [ModifiedDate] = @ModifiedDate, [PageContents] = @PageContents, [PageUrl] = @PageUrl, [MenuText] = @MenuText WHERE [PageID] = @PageID">
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
            <asp:Parameter DbType="Date" Name="CreationDate" />
            <asp:Parameter DbType="Date" Name="ModifiedDate" />
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
            <asp:Parameter DbType="Date" Name="CreationDate" />
            <asp:Parameter DbType="Date" Name="ModifiedDate" />
            <asp:Parameter Name="PageContents" Type="String" />
            <asp:Parameter Name="PageUrl" Type="String" />
            <asp:Parameter Name="MenuText" Type="String" />
            <asp:Parameter Name="PageID" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
    </br>
    </div>
    </div>
    </section>
</asp:Content>
