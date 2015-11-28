<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="AdminPanel_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="css/screen.css" rel="stylesheet" type="text/css" />
    <link href="css/pages.css" rel="stylesheet" type="text/css" />
    <link href="css/StyleSheet.css" rel="stylesheet" type="text/css" />
    <link href="css/modernizr.css" rel="stylesheet" type="text/css" />
    <link href="css/design.css" rel="stylesheet" type="text/css" />
    <link href="css/ui-framework.css" rel="stylesheet" type="text/css" />

    <title></title>
</head>
<body  id="index">
<div class="wrapper">
	<div class="error" style="display: none;">
		<p><b>Error:</b> Login failed. Please double check your Username and Password</p>
	</div>
    <div class="bodycontent clearfix">
		<div id="maincontent">
			<div class="main">
				<h3>Login To Admin Panel</h3>
    <form id="form1" runat="server">
    <table cellpadding="0">
						 
						<tr>
							<td> <asp:Label ID="lbl" runat="server"></asp:Label></td>
						</tr>
						<tr>
							<td><label>User Name</label></td>
						</tr>
						<tr>
							<td>
                                <asp:TextBox ID="TextBox1" runat="server" CssClass="text"></asp:TextBox> </td>
						</tr>
						<tr>
							<td><label>Password</label></td>
						</tr>
						<tr>
							<td>
                                <asp:TextBox ID="TextBox2" runat="server" CssClass="text" TextMode="Password"></asp:TextBox> </td>
						</tr>
						<tr>
							<td align="right">
                                <asp:Button ID="btnLogin" runat="server" Text="Login" class="uifw-frm-button large lime submit"
                                    onclick="btnLogin_Click" /> </td>
						</tr>
					</table>
                       <div id="footer">
                                <div class="footer-inner" runat="server" id="footer">  </div>
                    </div>
  <%--  <p class="cta"><strong>«</strong> <a href="../" style="color:Black">Back to Karakorm</a></p> 
    	<p class="cta">
            
            Copyright ©2003 - 2013 <a target="_blank" href="http://www.pakistanwebhost.com/" style="Color:Black;">Pakistan Web Host</a></p>
            </center> --%>
    <!--&nbsp; | &nbsp; <a href="forgot-password">Forgot your password?</a> »-->
 <asp:Label ID="lbll" runat="server" Text=" "></asp:Label>
    </form>
                
                
    </div>
    </div>
    </div>
    </div>  
</body>
</html>