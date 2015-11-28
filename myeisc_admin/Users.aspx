<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="Users.aspx.cs" Inherits="AdminPanel_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>

<asp:Content ID="title" ContentPlaceHolderID="title" runat="Server">

Manage Users
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server"> 
<%--<div class="uifw-message information "><p class="uifw-message-header">Manage Users</p><p>Here you can manage Users.</p></div> --%>
    <section class="uiifw-layout-section">
                <header class="cf"><b>All Users</b> 
                
               
             
         <asp:HyperLink ID="HyperLink1" style="float: right;
margin-top: -7px;
margin-right: -10px;" runat="server"  CssClass="btn btn-warning" NavigateUrl="Add-User.aspx">Add new user</asp:HyperLink>
        
                
                </header>
          <div class="body org ">
          <div>
          <div align="left">
          <asp:Label ID="lbl" runat="server" Visible="false"></asp:Label></div>
        
   	  

 <%--<div id="sidebar">
			<ul class="snav">
				<!-- InstanceBeginEditable name="EditRegionSideNav" -->
				<li><a href="#" class="current" accesskey="v"><em>A</em>ll Users</a></li>
				<li><a href="Add-User.aspx" accesskey="c"><em>C</em>reate New User</a></li>
								<!-- InstanceEndEditable -->
			</ul>
		</div>--%>
        <asp:GridView ID="GridView1" runat="server" AllowPaging="True" CssClass="orderListContent high Grid" RowStyle-Height="40px"   
        AutoGenerateColumns="False" DataKeyNames="UserID" DataSourceID="sdsusers"  AlternatingRowStyle-CssClass="alt" PagerStyle-CssClass="pgr"
         Width="930px" onrowdeleted="GridView1_RowDeleted" >
            <Columns> 
                <asp:BoundField DataField="UserName" HeaderText="User Name" 
                    SortExpression="UserName" ItemStyle-Width="35%" />
                  <asp:BoundField DataField="Email" HeaderText="User Email" SortExpression="Email" ItemStyle-Width="25%" />
                 <asp:BoundField DataField="CreatedOn" HeaderText="Created On" 
                    SortExpression="CreatedOn"  ItemStyle-Width="25%" /> 
                <asp:HyperLinkField DataNavigateUrlFields="UserID" 
                  DataNavigateUrlFormatString="Add-User.aspx?UserID={0}"
                Text="View"  ControlStyle-CssClass="btn btn-warning" />  
                        <asp:TemplateField>
                <ItemTemplate>
                    <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="return confirm('Are you sure you  want to delete this record?');"
                        CommandName="Delete"  ControlStyle-CssClass="btn-danger btn">Delete  </asp:LinkButton>
                </ItemTemplate>
            </asp:TemplateField>
            </Columns>
     </asp:GridView>
    <asp:SqlDataSource ID="sdsusers" runat="server" 
        ConnectionString="<%$ ConnectionStrings:CS %>" 
        DeleteCommand="DELETE FROM [Users] WHERE [UserID] = @UserID" 
        InsertCommand="INSERT INTO [Users] ([UserName], [UserPassword], [Mobile], [LastActivityDate], [Email], [IsAprrove], [IsLockOut], [LastPasswordChangeDate], [Comments], [CreatedOn]) VALUES (@UserName, @UserPassword, @Mobile, @LastActivityDate, @Email, @IsAprrove, @IsLockOut, @LastPasswordChangeDate, @Comments, @CreatedOn)" 
        SelectCommand="SELECT * FROM [Users]" 
        UpdateCommand="UPDATE [Users] SET [UserName] = @UserName, [UserPassword] = @UserPassword, [Mobile] = @Mobile, [LastActivityDate] = @LastActivityDate, [Email] = @Email, [IsAprrove] = @IsAprrove, [IsLockOut] = @IsLockOut, [LastPasswordChangeDate] = @LastPasswordChangeDate, [Comments] = @Comments, [CreatedOn] = @CreatedOn WHERE [UserID] = @UserID">
        <DeleteParameters>
            <asp:Parameter Name="UserID" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="UserName" Type="String" />
            <asp:Parameter Name="UserPassword" Type="String" />
            <asp:Parameter Name="Mobile" Type="String" />
            <asp:Parameter DbType="Date" Name="LastActivityDate" />
            <asp:Parameter Name="Email" Type="String" />
            <asp:Parameter Name="IsAprrove" Type="Object" />
            <asp:Parameter Name="IsLockOut" Type="Object" />
            <asp:Parameter DbType="Date" Name="LastPasswordChangeDate" />
            <asp:Parameter Name="Comments" Type="String" />
            <asp:Parameter DbType="Date" Name="CreatedOn" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="UserName" Type="String" />
            <asp:Parameter Name="UserPassword" Type="String" />
            <asp:Parameter Name="Mobile" Type="String" />
            <asp:Parameter DbType="Date" Name="LastActivityDate" />
            <asp:Parameter Name="Email" Type="String" />
            <asp:Parameter Name="IsAprrove" Type="Object" />
            <asp:Parameter Name="IsLockOut" Type="Object" />
            <asp:Parameter DbType="Date" Name="LastPasswordChangeDate" />
            <asp:Parameter Name="Comments" Type="String" />
            <asp:Parameter DbType="Date" Name="CreatedOn" />
            <asp:Parameter Name="UserID" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
     </br>
    </div>
    </div>
    </section>
    </asp:Content>

