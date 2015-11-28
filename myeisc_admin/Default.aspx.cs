using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

public partial class AdminPanel_Default : System.Web.UI.Page
{

    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CS"].ConnectionString);
    protected void Page_Load(object sender, EventArgs e)
    {
      
    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        String username = TextBox1.Text;
        String password = TextBox2.Text;
        try
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("p__user__Login", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlParameter param1 = new SqlParameter("@Username", username);
            SqlParameter param2 = new SqlParameter("@Password", password);
            cmd.Parameters.Add(param1);
            cmd.Parameters.Add(param2);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["Usernameadmn"] = username;
                Session["passwordadmn"] = password;
                Response.Redirect("Pages.aspx");
            }
            else
            {
                lbl.Text = "Provide correct Username or Password";
                lbl.CssClass = "error";
            }
        }
        catch (Exception e7)
        {
            lbl.Text = e7.Message;
        }
        finally
        {

            con.Close();
        }


    }
}