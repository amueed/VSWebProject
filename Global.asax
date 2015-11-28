<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>
<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
         
        RegisterRoutes(RouteTable.Routes);

    }
    public static void RegisterRoutes(RouteCollection routes)
    {
        routes.RouteExistingFiles = false;
        routes.Ignore("{resource}.axd/{*pathInfo}");
        routes.MapPageRoute("{SlugUrl}", "{SlugUrl}", "~/ContentPage.aspx");
     
    }
    void Application_End(object sender, EventArgs e) 
    { 
    }   
    void Application_Error(object sender, EventArgs e) 
    {  
    } 
    void Session_Start(object sender, EventArgs e) 
    {    
    } 
    void Session_End(object sender, EventArgs e) 
    {     
    }  
</script>