<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Register.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
<div class="breadcrumbs">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h4>Register</h4>
					<span>All What You Need To Know</span>
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
							<div class="section-title section-title-2 section-title-3"><h6>Register Form :</h6></div>
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
                                        <div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-phone"></i>
                                                 <asp:TextBox ID="txtphone" placeholder="Phone Number" runat="server"></asp:TextBox>
                                             
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Your Phon Number!" ControlToValidate="txtphone" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>
											</div>
										</div>
                                          <div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-users"></i>
                                                 <asp:TextBox ID="txtusername"  placeholder="Username" runat="server"></asp:TextBox>
                                             
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Your Username!" ControlToValidate="txtusername" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>
											</div>
										</div>
                                           <div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-lock"></i>
                                                 <asp:TextBox ID="txtpssword" TextMode="Password" placeholder="Password" runat="server"></asp:TextBox>
                                             
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Your Password!" ControlToValidate="txtpssword" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>
											</div>
										</div>
                                         <div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-lock"></i>
                                                 <asp:TextBox ID="txtconfirm" TextMode="Password" placeholder="Confirm Password" runat="server"></asp:TextBox>
                                                <asp:CompareValidator ID="CompareValidator1" runat="server" 
                                                    ErrorMessage="Password is not same" ControlToCompare="txtpssword" Font-Size="11px" ValidationGroup="contact" 
                                                    ControlToValidate="txtconfirm" Display="Dynamic"></asp:CompareValidator>
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Confirm Your Password!" ControlToValidate="txtconfirm" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>
											</div>
										</div>







									
										<div class="col-md-12">
                                            <asp:Button ID="Button1" ValidationGroup="contact" CssClass="button-3" runat="server" Text="Register" 
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

