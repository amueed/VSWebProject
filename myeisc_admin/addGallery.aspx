<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="addGallery.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
Create Gallry
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <section class="uiifw-layout-section">
                <header class="cf"><b> Create Gallry  </b> </header>
          <div class="body org ">
          <div>  <p> <asp:Label ID="lbl" runat="server" Font-Size="Large"  Visible="false"></asp:Label></p>
    <asp:FormView ID="FormView1" runat="server" DataKeyNames="id" DefaultMode="insert" 
        DataSourceID="SqlDataSource1" oniteminserted="FormView1_ItemInserted">
      
   
    
        <InsertItemTemplate>
        <table>
        <tr>
        <td> Picture:</td>
            <td>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</td>
            <td> 
                <asp:FileUpload ID="FileUpload1" runat="server" Filename= '<%# Bind("picture") %>' ></asp:FileUpload>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="project"></asp:RequiredFieldValidator>
            
            
            <%-- <asp:TextBox ID="pictureTextBox" runat="server" Text='<%# Bind("picture") %>' />--%></td>
            <td>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</td>
        <td> Related Project:</td>
            <td>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</td>
            <td> 
            <asp:DropDownList ID="DropDownList1" runat="server" AppendDataBoundItems="true" DataSourceID="sdsddl" Width="200px" Text='<%# Bind("relatedProject") %>' 
                    DataTextField="title" DataValueField="id">
                <asp:ListItem Value="0">Random</asp:ListItem>
                </asp:DropDownList>
            
            
                <asp:SqlDataSource ID="sdsddl" runat="server"  
                    ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                    SelectCommand="SELECT [title], [id] FROM [Projects]"></asp:SqlDataSource>
            
            
        <%--    <asp:TextBox ID="relatedProjectTextBox" runat="server" 
                Text='<%# Bind("relatedProject") %>' />--%>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
                <td>
                    &nbsp;</td>
                <td>   <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" CssClass="btn btn-warning" ValidationGroup="project"
                CommandName="Insert" Text="Submit" />
            &nbsp;<asp:LinkButton ID="InsertCancelButton" runat="server" CssClass="btn btn-danger"
                CausesValidation="False" CommandName="Cancel" Text="Cancel" /></td>
        </tr>
        
        </table>
         
        </InsertItemTemplate>
     
    </asp:FormView>
    </div></div></section>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
      
        InsertCommand="INSERT INTO [gallery] ([picture], [relatedProject]) VALUES (@picture, @relatedProject)"  >
      
        <InsertParameters>
            <asp:Parameter Name="picture" Type="String" />
            <asp:Parameter Name="relatedProject" Type="Int32" />
        </InsertParameters>
        
    </asp:SqlDataSource>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

