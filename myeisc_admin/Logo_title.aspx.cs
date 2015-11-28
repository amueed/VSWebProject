using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class myeisc_admin_Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void FormView1_ItemUpdated(object sender, FormViewUpdatedEventArgs e)
    {
        FileUpload fu = (FileUpload)FormView1.FindControl("FileUpload1");
        String filePath = Server.MapPath(@"~/Uploads/" + fu.FileName);
        fu.SaveAs(filePath);
       // Response.Redirect("HomepageProjects.aspx");
    }
}