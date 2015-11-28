<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="Callbackrequests.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
Callback Requests
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
        DataKeyNames="id" DataSourceID="callback">
        <Columns>
            <asp:BoundField DataField="name" HeaderText="Name" SortExpression="name" />
            <asp:BoundField DataField="phone" HeaderText="Phone" SortExpression="phone" />
              <asp:TemplateField HeaderStyle-Width="30px">
                <ItemTemplate>
                  <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="return confirm('Are you sure you  want to delete this record?');"
                        CommandName="Delete"  ControlStyle-CssClass="btn-danger btn">Delete  </asp:LinkButton>
                </ItemTemplate>
                </asp:TemplateField>
        </Columns>
    </asp:GridView>
    </div></div></div></section>

    <asp:SqlDataSource ID="callback" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        DeleteCommand="DELETE FROM [Callback] WHERE [id] = @id" 
        InsertCommand="INSERT INTO [Callback] ([name], [phone]) VALUES (@name, @phone)" 
        SelectCommand="SELECT * FROM [Callback]" 
        UpdateCommand="UPDATE [Callback] SET [name] = @name, [phone] = @phone WHERE [id] = @id">
        <DeleteParameters>
            <asp:Parameter Name="id" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="name" Type="String" />
            <asp:Parameter Name="phone" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="name" Type="String" />
            <asp:Parameter Name="phone" Type="String" />
            <asp:Parameter Name="id" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

