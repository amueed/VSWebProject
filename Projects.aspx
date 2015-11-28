<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Projects.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">\
<div class="breadcrumbs">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h4>Our Projects</h4>
					<span>All What You Need To Know About Us</span>
				</div>
				<div class="col-md-6">
					
				</div>
			</div><!-- End row -->
		</div><!-- End container -->
	</div>
	
	<div class="sections">
		<div class="container">
			<!-- End sections-title -->
			<div class="row">
				
				<div class="col-md-12">
				<div class="gallery-project">
                    <asp:Repeater ID="Repeater1" runat="server" DataSourceID="sdsrepeater">
                   <ItemTemplate>
                  
				<div class="circleline animation" data-animate="rollIn" >
				<img src="Uploads/<%# Eval("pic") %>">
				<h3> <%# Eval("title")%></h3>
					 <%# Eval("Description")%>
					 </div>
                     </ItemTemplate>

                      </asp:Repeater>
				    <asp:SqlDataSource ID="sdsrepeater" runat="server" 
                        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                        SelectCommand="SELECT * FROM [Projects] ORDER BY [id] DESC">
                    </asp:SqlDataSource>
					 
					<%-- <div class="circleline animation" data-animate="rollIn" >
				<img src="images/project.png">
				<h3>Welfare Projects</h3>
					<p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
					
					 <p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique  tristique senectus et netus </p>
					 </div>
					 
					 <div class="circleline animation" data-animate="rollIn" >
				<img src="images/project.png">
				<h3>Welfare Projects</h3>
					<p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
					
					 <p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique  tristique senectus et netus </p>
					 </div>
					 
					 <div class="circleline animation" data-animate="rollIn" >
				<img src="images/project.png">
				<h3>Welfare Projects</h3>
					<p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
					
					 <p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque. Pellentesque habitant morbi tristique  tristique senectus et netus </p>
					 </div>--%>
				</div>
				</div>
			</div><!-- End row -->
		</div><!-- End container -->
	</div>

</asp:Content>

