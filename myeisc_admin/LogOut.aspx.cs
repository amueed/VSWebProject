using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdminPanel_Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
           //   Session["Username"] = "";
             //  Session["password"] = "";
               Session.Remove("Usernameadmn");
               Session.Remove("passwordadmn");
        //redirect to index page
               Response.Redirect("Default.aspx");
    }
}