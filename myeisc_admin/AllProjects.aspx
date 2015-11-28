<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="AllProjects.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
Manage Projects
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <section class="uiifw-layout-section">
                <header class="cf"><b>   All Projects  </b> 
                
               
         <asp:HyperLink ID="HyperLink1" runat="server" style="float: right;
margin-top: -7px;
margin-right: -10px;"  CssClass="btn btn-warning"
          NavigateUrl="CreateProject.aspx">Create New Project</asp:HyperLink>
         
                
                
                </header>
          <div class="body org ">
          <div>
    <div>
      <div align="left">
          <asp:Label ID="lbl" runat="server" Visible="false"></asp:Label></div>


    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" AlternatingRowStyle-CssClass="alt" PagerStyle-CssClass="pgr" CssClass="Grid" Width="100%" 
        DataKeyNames="id" DataSourceID="sdsgrid">
        <Columns>
           <asp:TemplateField HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel4" runat="server" ImageUrl='<%# Eval("Pic", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
         <%--   <asp:BoundField DataField="id" HeaderText="id" InsertVisible="False" 
                ReadOnly="True" SortExpression="id" />--%>
            <asp:BoundField DataField="title" HeaderText="Title" SortExpression="title" />
         <%--   <asp:BoundField DataField="Description" HeaderText="Description" 
                SortExpression="Description" />--%>
           <%-- <asp:BoundField DataField="Pic" HeaderText="Pic" SortExpression="Pic" />--%>
            <asp:BoundField DataField="status" HeaderText="Status" 
                SortExpression="status" />
                  <asp:HyperLinkField DataNavigateUrlFields="id" HeaderStyle-Width="30px"
             DataNavigateUrlFormatString="CreateProject.aspx?PageID={0}"
                Text="Edit" ControlStyle-CssClass="btn btn-warning" />
                 <asp:TemplateField HeaderStyle-Width="30px">
                <ItemTemplate>
                  <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="return confirm('Are you sure you  want to delete this record?');"
                        CommandName="Delete"  ControlStyle-CssClass="btn-danger btn">Delete  </asp:LinkButton>
                </ItemTemplate>
                </asp:TemplateField>

        </Columns>
    </asp:GridView>
    <asp:SqlDataSource ID="sdsgrid" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        DeleteCommand="DELETE FROM [Projects] WHERE [id] = @id" 
        InsertCommand="INSERT INTO [Projects] ([title], [Description], [Pic], [status]) VALUES (@title, @Description, @Pic, @status)" 
        SelectCommand="SELECT * FROM [Projects]" 
        UpdateCommand="UPDATE [Projects] SET [title] = @title, [Description] = @Description, [Pic] = @Pic, [status] = @status WHERE [id] = @id">
        <DeleteParameters>
            <asp:Parameter Name="id" Type="Int32" />
        </DeleteParameters>
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
    </div></div></div></section>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

