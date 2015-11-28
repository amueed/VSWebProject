using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

public partial class SiteMaster : System.Web.UI.MasterPage
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CS"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {
      
        if (DateTime.Now.Year==2016)
        {
            Response.Redirect("Site_Payment.aspx");
        }
       
        if (Session["username"]!=null || Session["password"]!=null)
        {
            loginlink.Visible = false;
            logoutlink.Visible = true;
            registerlink.Visible = false;
        }
        SqlCommand weblinks = new SqlCommand("select * from Websites where WebsiteID=1", con);
        SqlDataAdapter da = new SqlDataAdapter(weblinks);
        DataTable dt = new DataTable();
        da.Fill(dt);
        if (dt.Rows.Count > 0)
        {
            string fb = dt.Rows[0]["FaceBook"].ToString();
            string twitter = dt.Rows[0]["Twitter"].ToString();
            string li = dt.Rows[0]["Plus"].ToString();
            string phone = dt.Rows[0]["Phone"].ToString();
            string email = dt.Rows[0]["Email"].ToString();
            Literal1.Text = phone;
            Literal2.Text = email;
            fb1.HRef = fb;
            twitterb.HRef = twitter;
            gp.HRef = li;
        }
       // string pagetitle;
        SqlCommand pagetile = new SqlCommand("select * from logo_title where id=1", con);
        SqlDataAdapter da1 = new SqlDataAdapter(pagetile);
        DataTable dt1 = new DataTable();
        da1.Fill(dt1);
        if (dt1.Rows.Count > 0)
        {
          string  pagetitle = dt1.Rows[0]["Page_title"].ToString();
          Literal3.Text = pagetitle;
        }

       

    }
}
