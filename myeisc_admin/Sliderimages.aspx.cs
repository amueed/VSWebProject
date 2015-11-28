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
    protected void FormView1_ItemInserted(object sender, FormViewInsertedEventArgs e)
    {
        FileUpload fu = (FileUpload)FormView1.FindControl("FileUpload1");
        String filePath = Server.MapPath(@"~/Uploads/" + fu.FileName);
        fu.SaveAs(filePath);


        FileUpload fu2 = (FileUpload)FormView1.FindControl("FileUpload2");
        String filePath2 = Server.MapPath(@"~/Uploads/" + fu2.FileName);
        fu2.SaveAs(filePath2);

        FileUpload fu3 = (FileUpload)FormView1.FindControl("FileUpload3");
        String filePath3 = Server.MapPath(@"~/Uploads/" + fu3.FileName);
        fu3.SaveAs(filePath3);

        FileUpload fu4 = (FileUpload)FormView1.FindControl("FileUpload4");
        String filePath4 = Server.MapPath(@"~/Uploads/" + fu4.FileName);
        fu4.SaveAs(filePath4);

        FileUpload fu5 = (FileUpload)FormView1.FindControl("FileUpload5");
        String filePath5 = Server.MapPath(@"~/Uploads/" + fu5.FileName);
        fu5.SaveAs(filePath5);


    }
}