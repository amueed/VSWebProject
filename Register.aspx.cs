using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;

public partial class Default2 : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CS"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string name = txtName.Text;
        string email = txtmail.Text;
        string phone = txtphone.Text;
        string usrname = txtusername.Text;
        string password = txtpssword.Text;
        SqlCommand nesltr = new SqlCommand("INSERT INTO RegisteredUser (name,email,phone,username,password) VALUES('" + name + "','" + email + "','" + phone + "','" + usrname + "','" + password + "')", con);
        con.Open();
        nesltr.ExecuteNonQuery();
        con.Close();
        Response.Redirect("Default.aspx");
    }
}