using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

public partial class Default2 : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CS"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string user = txtuName.Text;
        string password = txtpassword.Text;
        SqlCommand login = new SqlCommand("select * from RegisteredUser where username='" + user + "' and password='" + password + "'", con);
        SqlDataAdapter da = new SqlDataAdapter(login);
        DataTable dt = new DataTable();
        da.Fill(dt);
        if (dt.Rows.Count > 0)
        {
            Session["username"] = txtuName.Text;
            Session["password"] = txtpassword.Text;
            Response.Redirect("Default.aspx");
        }
        else
        {
            lbl1.Text = "Please recheck username and password";
        }

    }
}