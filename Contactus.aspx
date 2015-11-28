<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Contactus.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
    <asp:Label ID="lbl1" runat="server" Text=""></asp:Label>
	<div class="breadcrumbs">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h4>Contact Us</h4>
					<span>All What You Need To Know Contact Us</span>
				</div>
				<div class="col-md-6">
					
				</div>
			</div><!-- End row -->
		</div><!-- End container -->
	</div>
	
	<div class="sections" style="padding-top:0">
		<div class="container">
			<div class="row">
				<div class="col-md-12 main-content">
					<div class="row">
						<div class="col-md-9">
							<div class="section-title section-title-2 section-title-3"><h6>Contact Form :</h6></div>
							<div class="comment-form">
								<form method="post" class="form-js" action="contact_us.php">
									<div class="row">
										<div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-user"></i>
                                                <asp:TextBox ID="txtName" placeholder="Your Name" runat="server"></asp:TextBox>
                                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Your Name please!" ControlToValidate="txtName" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>

												<%--<input name="name" id="name" type="text" placeholder="Your Name">--%>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-envelope"></i>
                                                 <asp:TextBox ID="txtmail" placeholder="Email" runat="server"></asp:TextBox>
                                                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" 
                                                    ErrorMessage="Not Looks Like An Email" ControlToValidate="txtmail" ValidationGroup="contact"  
                                                    Display="Dynamic" ForeColor="Red" 
                                                    ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Your Email!" ControlToValidate="txtmail" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-input">
												<i class="fa fa-comment"></i>
                                                 <asp:TextBox ID="txtmsg" TextMode="MultiLine" placeholder="Message" runat="server"></asp:TextBox>
                                                   <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Your Message!" ControlToValidate="txtmsg" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>
											</div>
										</div>
										<div class="col-md-12">
                                            <asp:Button ID="Button1" ValidationGroup="contact" CssClass="button-3" runat="server" Text="Send Message" 
                                                onclick="Button1_Click" />
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="col-md-3">
                            <asp:FormView ID="FormView1" runat="server" DataSourceID="SqlDataSource1">
                               
                                <ItemTemplate>
                                    <asp:Label ID="PageContentsLabel" runat="server" 
                                        Text='<%# Bind("PageContents") %>' />
                                    <br />

                                </ItemTemplate>
                            </asp:FormView>
							<asp:SqlDataSource ID="SqlDataSource1" runat="server" 
                                ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                                SelectCommand="SELECT [PageContents] FROM [Pages] WHERE ([SlugUrl] = @SlugUrl)">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="contact" Name="SlugUrl" Type="String" />
                                </SelectParameters>
                            </asp:SqlDataSource>
							<%--<div class="section-title section-title-2 section-title-3"><h6>Contact Information :</h6></div>
							<div class="contact-information">
								<ul>
									<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem quam, adipiscing condimentum tristique.</li>
									<li>- info@corporatebuilders.com</li>
									<li>- +92 51 01234567</li>
								</ul>
							</div>
							<div class="section-title section-title-2 section-title-3"><h6>Business Hours :</h6></div>
							<ul class="business-hours">
								<li>Monday &ndash; Friday : 9am to 20 pm</li>
								<li>Saturday : 9am to 17 pm</li>
								<li>Sunday : day off</li>
							</ul>--%>
						</div>
					</div><!-- End row -->
				</div><!-- End main-content -->
			</div><!-- End row -->
			
		</div><!-- End container -->
	</div>
</asp:Content>

