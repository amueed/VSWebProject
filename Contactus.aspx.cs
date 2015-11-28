using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Net.Mail;

public partial class Default2 : System.Web.UI.Page
{

    public static string user = "info@myesico.com";
    public static string pass = "Pv0r6c_2";
    private static string fromAddress = "info@myesico.com";
    private static SmtpClient emailClient = new SmtpClient("mail.myesico.com");
    private static System.Net.NetworkCredential SMTPUserInfo = new System.Net.NetworkCredential(user, pass);
    protected void SendMail()
    {
        emailClient = new SmtpClient("mail.myesico.com", 25);
        SMTPUserInfo = new System.Net.NetworkCredential(user, pass);
        emailClient.UseDefaultCredentials = false;
        emailClient.Credentials = SMTPUserInfo;
        string toAddress = "info@myesico.com";
        string subject = "Feed Back from   " + txtmail.Text;
        string body = "From: " + txtName.Text + "\n";
        body += "Email: " + txtmail.Text + "\n";
        //  body += "Phon No.   " + TextBox2.Text + "\n";
        body += "Over View: \n" + txtmsg.Text + "\n";
        subject.Replace(" ", "&nbsp;");

        emailClient.Send(fromAddress, toAddress, subject, body);
    }

    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string Name = txtName.Text;
        string EmailAddressTextBox = txtmail.Text;
       
        string message = txtmsg.Text;
        SendMail();
    }
}