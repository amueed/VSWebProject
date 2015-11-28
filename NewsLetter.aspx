<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="NewsLetter.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
    <asp:Label ID="lbl1" runat="server" Text=""></asp:Label>
	<div class="breadcrumbs">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h4>News Letter</h4>
					<span>All What You Need To Know News Letter</span>
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
							<div class="section-title section-title-2 section-title-3"><h6>Subscription Form :</h6></div>
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
                                            <asp:Button ID="Button1" ValidationGroup="contact" CssClass="button-3" runat="server" Text="Subscribe" 
                                                onclick="Button1_Click" />
										</div>
									</div>
								</form>
							</div>
						</div>
					
					</div>
				</div>
			</div>
			
		</div>
	</div>


</asp:Content>

