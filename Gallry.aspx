<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Gallry.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
<div class="breadcrumbs">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h4>Picture Gallery</h4>
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

			<div class="col-md-12 main-content">
				<div class="row">
					<div class="col-md-12 protfolio-filter">
						<ul>
							<li class="current"><a data-filter="*" href="#">ALL</a></li>
							<li class=""><a data-filter=".term-photography" href="#">Projects Related</a></li>
							<%--<li class=""><a data-filter=".term-design" href="#">Project 2</a></li>
							<li class=""><a data-filter=".term-development" href="#">Project3</a></li>
							<li class=""><a data-filter=".term-wordpress" href="#">Other</a></li>--%>
						</ul>
					</div>
				</div><!-- End row -->
				<div class="row portfolio-all portfolio-0">
					<ul class="isotope" style="position: relative; overflow: hidden; height: 1308px;">
                        <asp:Repeater ID="Repeater2" DataSourceID="SqlDataSource2" runat="server">
                        <ItemTemplate>
                        
                        
                      


						<li class="col-md-3 term-design portfolio-item isotope-item" style="position: absolute; left: 0px; top: 0px; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1); opacity: 1;">
							<div class="portfolio-one">
								<div class="portfolio-head">
									<div class="portfolio-img"><img style="width:237px;height:190px" src="Uploads/<%# Eval("picture")%>" alt="" width="370" height="211"></div>
									<div class="portfolio-hover">
										<a class="portfolio-link" href="Projects.aspx"><i class="fa fa-link"></i></a>
										<a class="portfolio-zoom prettyPhoto" href="Uploads/<%# Eval("picture")%>"><i class="fa fa-search"></i></a>								    </div>
								</div>
								<%--<div class="portfolio-content">
									<i class="fa fa-leaf"></i>
									<div class="portfolio-meta">
										<div class="portfolio-name"><h6><a href="single-portfolio.html">Project Name</a></h6></div>
										<div class="portfolio-cat"><a href="#">Category</a></div>
									</div>
							    </div>--%>
						    </div>
					    </li>

                          </ItemTemplate>
                        </asp:Repeater>
                        <asp:SqlDataSource ID="SqlDataSource2" runat="server" 
                            ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                            SelectCommand="SELECT *,(select title from Projects where id=gallery.relatedProject) as ptitle,(select status from Projects where id=gallery.relatedProject) as pstatus FROM [gallery] WHERE ([relatedProject] = @relatedProject)">
                            <SelectParameters>
                                <asp:Parameter DefaultValue="0" Name="relatedProject" Type="Int32" />
                            </SelectParameters>
                        </asp:SqlDataSource>
                        <asp:Repeater ID="Repeater1" runat="server" DataSourceID="SqlDataSource1">
                        <ItemTemplate>
                        
                       


						<li class="col-md-3 term-photography portfolio-item isotope-item" style="position: absolute; left: 0px; top: 0px; transform: translate3d(242px, 0px, 0px) scale3d(1, 1, 1); opacity: 1;">
							<div class="portfolio-one">
								<div class="portfolio-head">
									<div class="portfolio-img"><img style="width:237px;height:190px" alt="" src="Uploads/<%# Eval("picture")%>"></div>
									<div class="portfolio-hover">
										<a class="portfolio-link" href="Projects.aspx"><i class="fa fa-link"></i></a>
										<a class="portfolio-zoom prettyPhoto" href="Uploads/<%# Eval("picture")%>"><i class="fa fa-search"></i></a>								    </div>
								</div>
								<div class="portfolio-content">
									<i class="fa fa-leaf"></i>
									<div class="portfolio-meta">
										<div class="portfolio-name"><h6><a href="Projects.aspxml"><%# Eval("ptitle")%></a></h6></div>
										<div class="portfolio-cat"><a href="#">Project <%# Eval("pstatus")%></a></div>
									</div><!-- End portfolio-meta -->
							    </div>
						    </div>
					    </li>

                         </ItemTemplate>
                        </asp:Repeater>
						<asp:SqlDataSource ID="SqlDataSource1" runat="server" 
                            ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                            SelectCommand="SELECT *,(select title from Projects where id=gallery.relatedProject) as ptitle,(select status from Projects where id=gallery.relatedProject) as pstatus FROM [gallery] WHERE ([relatedProject] != @relatedProject)">
                            <SelectParameters>
                                <asp:Parameter DefaultValue="0" Name="relatedProject" Type="Int32" />
                            </SelectParameters>
                        </asp:SqlDataSource>


					</ul>
				</div><!-- End portfolio-0 -->
				
				</div><!-- End pagination -->
		    </div>
			<!-- End main-content -->
		      <!-- End row -->
        </div>
  
</asp:Content>

