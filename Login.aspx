<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
  <asp:Label ID="lbl1" runat="server" Text=""></asp:Label>
	<div class="breadcrumbs">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h4>Login</h4>
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
							<div class="section-title section-title-2 section-title-3"><h6>Login Form :</h6></div>
							<div class="comment-form">
								<form method="post" class="form-js" action="contact_us.php">
									<div class="row">
										<div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-user"></i>
                                                <asp:TextBox ID="txtuName" placeholder="User Name" runat="server"></asp:TextBox>
                                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Your User Name please!" ControlToValidate="txtuName" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>

												
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-input">
												<i class="fa fa-lock"></i>
                                                 <asp:TextBox ID="txtpassword" TextMode="Password" placeholder="Password" runat="server"></asp:TextBox>
                                               
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Font-Size="11px" 
                                                    ErrorMessage="Password required!" ControlToValidate="txtpassword" Display="Dynamic" 
                                                    ForeColor="Red" ValidationGroup="contact"></asp:RequiredFieldValidator>
											</div>
										</div>
									
										<div class="col-md-12">
                                            <asp:Button ID="Button1" ValidationGroup="contact" CssClass="button-3" runat="server" Text="Login" 
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

