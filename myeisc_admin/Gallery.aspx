

<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="Gallery.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <section class="uiifw-layout-section">
                <header class="cf"><b>   Gallery  </b> 
                
               
         <asp:HyperLink ID="HyperLink1" runat="server" style="float: right;
margin-top: -7px;
margin-right: -10px;"  CssClass="btn btn-warning"
          NavigateUrl="addGallery.aspx">Add Picture</asp:HyperLink>
         
                
                
                </header>
          <div class="body org ">
          <div>
    <div>
      <div align="left">
          <asp:Label ID="lbl" runat="server" Visible="false"></asp:Label></div>
<asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" AlternatingRowStyle-CssClass="alt" PagerStyle-CssClass="pgr" CssClass="Grid" Width="100%" 
        DataKeyNames="id" DataSourceID="sdsgallery">
     

    <Columns>
        <asp:BoundField DataField="id" HeaderText="id" InsertVisible="False" 
            ReadOnly="True" SortExpression="id" />
               <asp:TemplateField HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel4" runat="server" ImageUrl='<%# Eval("picture", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
     
        <asp:BoundField DataField="projectname" HeaderText="Related Project" 
            SortExpression="relatedProject" />
             <asp:TemplateField HeaderStyle-Width="30px">
                <ItemTemplate>
                  <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="return confirm('Are you sure you  want to delete this record?');"
                        CommandName="Delete"  ControlStyle-CssClass="btn-danger btn">Delete  </asp:LinkButton>
                </ItemTemplate>
                </asp:TemplateField>
    </Columns>
</asp:GridView>
    <asp:SqlDataSource ID="sdsgallery" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        DeleteCommand="DELETE FROM [gallery] WHERE [id] = @id" 
        InsertCommand="INSERT INTO [gallery] ([picture], [relatedProject]) VALUES (@picture, @relatedProject)" 
        SelectCommand="SELECT *,(select title from Projects where id=g.relatedProject) as projectname FROM [gallery] g" 
        UpdateCommand="UPDATE [gallery] SET [picture] = @picture, [relatedProject] = @relatedProject WHERE [id] = @id">
        <DeleteParameters>
            <asp:Parameter Name="id" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="picture" Type="String" />
            <asp:Parameter Name="relatedProject" Type="Int32" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="picture" Type="String" />
            <asp:Parameter Name="relatedProject" Type="Int32" />
            <asp:Parameter Name="id" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

