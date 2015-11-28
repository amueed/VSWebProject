<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="ContentPage.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">


    
    
  
   
       <asp:FormView ID="FormView1" runat="server" DataSourceID="sdscontents" RenderOuterTable="false">

        <ItemTemplate>
            
            <asp:Label ID="PageContentsLabel" runat="server" 
                Text='<%# Bind("PageContents") %>' />
        </ItemTemplate>
    </asp:FormView>
    <asp:SqlDataSource ID="sdscontents" runat="server" 
        ConnectionString="<%$ ConnectionStrings:CS %>" 
        SelectCommand="SELECT [PageContents], [Title] FROM [Pages] WHERE ([SlugUrl] = @SlugUrl)">
        <SelectParameters>
            <asp:RouteParameter Name="SlugUrl" RouteKey="SlugUrl" Type="String" />
        </SelectParameters>
    </asp:SqlDataSource>
        
      
        
      
</asp:Content>

 