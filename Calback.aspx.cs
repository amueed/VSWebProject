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
        string phone = txtphone.Text;
        SqlCommand nesltr = new SqlCommand("INSERT INTO Callback (name,phone) VALUES('" + name + "','" + phone + "')", con);
        con.Open();
        nesltr.ExecuteNonQuery();
        con.Close();
        lbl1.Text = "We got yor phone number! our team will contact you in 72 hours.Thanks";
       // Response.Redirect("Default.aspx");
       
    }
}