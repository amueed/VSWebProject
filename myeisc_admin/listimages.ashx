<%@ WebHandler Language="C#" Class="listimages" %> 
using System;
using System.Web;

public class listimages : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string path = context.Server.MapPath("~/img/");
        System.IO.DirectoryInfo di = new System.IO.DirectoryInfo(path);
        string json = "[";

        foreach (var item in di.EnumerateFiles())
        {
            json += "{\"image\": \"/MaryumWelfere/img/" + item.Name + "\",\"thumb\": \"/MaryumWelfere/mashabrum/img/" + item.Name + "\",\"folder\": \"Small\"},";
        }
        json = json.TrimEnd(',');
        json += "]";
        context.Response.Write(json);
    }
    public bool IsReusable
    {
        get { return false; }
    }
}