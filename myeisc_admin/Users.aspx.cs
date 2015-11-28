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

    }
    protected void GridView1_RowDeleted(object sender, GridViewDeletedEventArgs e)
    {
        lbl.Text = "<div class='uifw-message error'> <p class='uifw-message-header'><span>Deleted Message<span></p>User Deleted Successfully.</div>";
        lbl.Visible = true;
    }
}