using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdminPanel_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!string.IsNullOrWhiteSpace(Request.QueryString["PageID"]))
        {
            FormView1.DefaultMode = FormViewMode.Edit;


        }
    }

    protected void FormView1_ItemInserted(object sender, FormViewInsertedEventArgs e)
    {
        if (e.Exception == null)
        {
            lbl.Text = "<div class='uifw-message done'> <p class='uifw-message-header'><span>Successfull Message<span></p>New Page Created Successfully.</div>";
            lbl.ForeColor = System.Drawing.Color.Green;
            lbl.Visible = true;

        }
        else
        {
            e.ExceptionHandled = true;
            lbl.Text = "<div class='uifw-message warning'> <p class='uifw-message-header'><span>Warning Message<span></p>Some thing went wrong  When you Created This Page</div>"; 
            lbl.Visible = true;


        }
    }
    protected void FormView1_ItemUpdated(object sender, FormViewUpdatedEventArgs e)
    {
        if (e.Exception == null)
        {
            lbl.Text = "<div class='uifw-message done'> <p class='uifw-message-header'><span>Successfull Message<span></p>Page Contents Change Successfully.</div>";
            lbl.ForeColor = System.Drawing.Color.Green;
            lbl.Visible = true;
           

            lbl.ForeColor = System.Drawing.Color.Green;

        }
        else
        {
            e.ExceptionHandled = true;
            lbl.Text = "<div class='uifw-message warning'> <p class='uifw-message-header'><span>Warning Message<span></p>Some thing went wrong  When you Created This Page</div>";
          
            lbl.Visible = true;
           
            


        }
    }
}