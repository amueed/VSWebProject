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
      
        if (!string.IsNullOrWhiteSpace(Request.QueryString["UserID"]))
        {
            FormView1.DefaultMode = FormViewMode.Edit;
        }
    }
    protected void FormView1_ItemInserted(object sender, FormViewInsertedEventArgs e)
    {
        if (e.Exception == null)
        {
            lbl.Text = "<div class='uifw-message done'> <p class='uifw-message-header'><span>Successfull Message<span></p>User Registered Successfully.</div>";
            lbl.ForeColor = System.Drawing.Color.Green;
            lbl.Visible = true;
            
        }
        else
        {
            e.ExceptionHandled = true;
            lbl.Text = "<div class='uifw-message warning'> <p class='uifw-message-header'><span>Warning Message<span></p>Some thing went wrong When you are Register User</div>";
            lbl.ForeColor = System.Drawing.Color.Red;
            lbl.Visible = true;
           
        }
    }
    protected void FormView1_ItemUpdated(object sender, FormViewUpdatedEventArgs e)
    {
        if (e.Exception == null)
        {
            lbl.Text = "<div class='uifw-message done'> <p class='uifw-message-header'><span>Successfull Message<span></p>User info Updated Successfully!</div>";
             

            lbl.ForeColor = System.Drawing.Color.Green;
             lbl.Visible = true;
        }
        else
        {
            e.ExceptionHandled = true;
            lbl.Text = "<div class='uifw-message warning'> <p class='uifw-message-header'><span>Warning Message<span></p>Some thing went wrong When you are Register User</div>";
            lbl.ForeColor = System.Drawing.Color.Red;


        }
    }
}