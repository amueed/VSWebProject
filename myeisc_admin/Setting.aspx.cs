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
        if (!string.IsNullOrWhiteSpace(Request.QueryString["WebsiteID"]))
        {
            FormView1.DefaultMode = FormViewMode.Edit; 

        }
    }
    protected void FormView1_ItemUpdated(object sender, FormViewUpdatedEventArgs e)
    {
        if (e.Exception == null)
        {
            lbl.Text = "<div class='uifw-message done'> <p class='uifw-message-header'><span>Successfull Message<span></p>Website Setting Save Successfully.</div>";
            lbl.ForeColor = System.Drawing.Color.Green;
            lbl.Visible = true;

        }
        else
        {
            e.ExceptionHandled = true;
            lbl.Text = "<div class='uifw-message warning'> <p class='uifw-message-header'><span>Waring Message<span></p>Website Some thing went wrong Your Setting.</div>"; 
            lbl.Visible = true;
            


        }
    }
}