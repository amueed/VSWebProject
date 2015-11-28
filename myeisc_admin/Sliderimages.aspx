<%@ Page Title="" Language="C#" MasterPageFile="~/myeisc_admin/Admin.master" AutoEventWireup="true" CodeFile="Sliderimages.aspx.cs" Inherits="myeisc_admin_Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="title" Runat="Server">
Slide Show
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

 <section class="uiifw-layout-section">
                <header class="cf"><b> Create And Edit slideshow  </b> </header>
          <div class="body org ">
          <div>  <p> <asp:Label ID="lbl" runat="server" Font-Size="Large"  Visible="false"></asp:Label></p>
          <table>
          <tr>
          <th style="text-align: center;">Add New Slide</th><th style="text-align: center;"> All Slides</th>
          </tr>
          <tr>

          <td>    <asp:FormView ID="FormView1" runat="server" DataKeyNames="id" DefaultMode="Insert" 
                  DataSourceID="SqlDataSource1" oniteminserted="FormView1_ItemInserted">
     
        <InsertItemTemplate>
        <table>
        <tr>
        <td>  First Image::</td>
        <td> 
        
         <asp:FileUpload ID="FileUpload1" runat="server" Filename= '<%# Bind("firststimage") %>' ></asp:FileUpload>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload1" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="slideshow"></asp:RequiredFieldValidator>
      <%--  <asp:TextBox ID="firststimageTextBox" runat="server" 
                Text='<%# Bind("firststimage") %>' />--%></td>
        </tr>
        <tr>
        <td>  Second Image:</td>
        <td> 
         <asp:FileUpload ID="FileUpload2" runat="server" Filename= '<%# Bind("secondimage") %>' ></asp:FileUpload>
         <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload2" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="slideshow"></asp:RequiredFieldValidator>
       <%-- <asp:TextBox ID="secondimageTextBox" runat="server" 
                Text='<%# Bind("secondimage") %>' />--%>
                </td>
        </tr>
        <tr>
        <td>   Third Image:</td>
        <td>
         <asp:FileUpload ID="FileUpload3" runat="server" Filename= '<%# Bind("thirdimage") %>' ></asp:FileUpload>
         <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload3" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="slideshow"></asp:RequiredFieldValidator>
        <%-- <asp:TextBox ID="thirdimageTextBox" runat="server" 
                Text='<%# Bind("thirdimage") %>' />--%>
                
                </td>
        </tr>
        <tr>
        <td> Fourth Image:</td>
        <td>
        
         <asp:FileUpload ID="FileUpload4" runat="server" Filename= '<%# Bind("forthimage") %>' ></asp:FileUpload>
          <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload4" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="slideshow"></asp:RequiredFieldValidator>
        <%--  <asp:TextBox ID="forthimageTextBox" runat="server" 
                Text='<%# Bind("forthimage") %>' />--%>
                
                
                </td>
        </tr>
        <tr>
        <td>   Fifth Image:</td>
        <td> 
        
         <asp:FileUpload ID="FileUpload5" runat="server" Filename= '<%# Bind("fifthimage") %>' ></asp:FileUpload>
         <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" Font-Size="11px" 
                ErrorMessage="image not selected" ControlToValidate="FileUpload4" 
                Display="Dynamic" ForeColor="Red" ValidationGroup="slideshow"></asp:RequiredFieldValidator>
      <%--  <asp:TextBox ID="fifthimageTextBox" runat="server" 
                Text='<%# Bind("fifthimage") %>' />--%>
                
                </td>
        </tr>
            <tr>
                <td>
                    &nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
        <tr>
        <td></td>
        <td> <asp:LinkButton ID="InsertButton" runat="server" CausesValidation="True" CssClass="btn btn-warning" ValidationGroup="slideshow"  
                CommandName="Insert" Text="Submit" />
            &nbsp;<asp:LinkButton ID="InsertCancelButton" CssClass="btn btn-danger" runat="server" 
                CausesValidation="False" CommandName="Cancel" Text="Cancel" /></td>
        </tr>
        </table>
           
           
        </InsertItemTemplate>
        <ItemTemplate>
            id:
            <asp:Label ID="idLabel" runat="server" Text='<%# Eval("id") %>' />
            <br />
            Firstst Image:
            <asp:Label ID="firststimageLabel" runat="server" 
                Text='<%# Bind("firststimage") %>' />
            <br />
            Second Image:
            <asp:Label ID="secondimageLabel" runat="server" 
                Text='<%# Bind("secondimage") %>' />
            <br />
            Third Image:
            <asp:Label ID="thirdimageLabel" runat="server" 
                Text='<%# Bind("thirdimage") %>' />
            <br />
            Fourth Image:
            <asp:Label ID="forthimageLabel" runat="server" 
                Text='<%# Bind("forthimage") %>' />
            <br />
            Fifth Image:
            <asp:Label ID="fifthimageLabel" runat="server" 
                Text='<%# Bind("fifthimage") %>' />
            <br />
            <asp:LinkButton ID="EditButton" runat="server" CausesValidation="False" 
                CommandName="Edit" Text="Edit" />
            &nbsp;<asp:LinkButton ID="DeleteButton" runat="server" CausesValidation="False" 
                CommandName="Delete" Text="Delete" />
            &nbsp;<asp:LinkButton ID="NewButton" runat="server" CausesValidation="False" 
                CommandName="New" Text="New" />
        </ItemTemplate >
    </asp:FormView></td>
    <td style="width:74%;vertical-align: middle;"> <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="id"  AlternatingRowStyle-CssClass="alt" PagerStyle-CssClass="pgr" CssClass="Grid" Width="100%" 
                  DataSourceID="sliders">
        <Columns>
            <asp:BoundField DataField="id" HeaderText="S.No" InsertVisible="False" HeaderStyle-Width="20px" 
                ReadOnly="True" SortExpression="id" />
                  <asp:TemplateField  HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel1" runat="server" ImageUrl='<%# Eval("firststimage", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
          <%--  <asp:BoundField DataField="firststimage" HeaderText="Background" 
                SortExpression="firststimage" />--%>
                  <asp:TemplateField HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel2" runat="server" ImageUrl='<%# Eval("secondimage", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
           <%-- <asp:BoundField DataField="secondimage" HeaderText="Layer 1" 
                SortExpression="secondimage" />--%>
                  <asp:TemplateField HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel3" runat="server" ImageUrl='<%# Eval("thirdimage", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
           <%-- <asp:BoundField DataField="thirdimage" HeaderText="Layer 2" 
                SortExpression="thirdimage" />--%>
                  <asp:TemplateField HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel5" runat="server" ImageUrl='<%# Eval("forthimage", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
          <%--  <asp:BoundField DataField="forthimage" HeaderText="Layer 3" 
                SortExpression="forthimage" />--%>
                  <asp:TemplateField HeaderStyle-Width="30px">
                     <ItemTemplate>
                     
                     <asp:Image ID="PhotosLabel4" runat="server" ImageUrl='<%# Eval("fifthimage", "~/Uploads/{0}") %>' Width="100px" Height="50px" />
                     </ItemTemplate>
                     </asp:TemplateField>
          <%--  <asp:BoundField DataField="fifthimage" HeaderText="Layer 4" 
                SortExpression="fifthimage" />--%>
                <asp:TemplateField HeaderStyle-Width="30px">
                <ItemTemplate>
                  <asp:LinkButton ID="LinkButton1" runat="server" OnClientClick="return confirm('Are you sure you  want to delete this record?');"
                        CommandName="Delete"  ControlStyle-CssClass="btn-danger btn">Delete  </asp:LinkButton>
                </ItemTemplate>
                </asp:TemplateField>
              
        </Columns>
              </asp:GridView></td>
          </tr>
          </table>


   
              <asp:SqlDataSource ID="sliders" runat="server" 
                  ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                  DeleteCommand="DELETE FROM [slidshow] WHERE [id] = @id" 
                  InsertCommand="INSERT INTO [slidshow] ([firststimage], [secondimage], [thirdimage], [forthimage], [fifthimage]) VALUES (@firststimage, @secondimage, @thirdimage, @forthimage, @fifthimage)" 
                  SelectCommand="SELECT * FROM [slidshow]" 
                  UpdateCommand="UPDATE [slidshow] SET [firststimage] = @firststimage, [secondimage] = @secondimage, [thirdimage] = @thirdimage, [forthimage] = @forthimage, [fifthimage] = @fifthimage WHERE [id] = @id">
                  <DeleteParameters>
                      <asp:Parameter Name="id" Type="Int32" />
                  </DeleteParameters>
                  <InsertParameters>
                      <asp:Parameter Name="firststimage" Type="String" />
                      <asp:Parameter Name="secondimage" Type="String" />
                      <asp:Parameter Name="thirdimage" Type="String" />
                      <asp:Parameter Name="forthimage" Type="String" />
                      <asp:Parameter Name="fifthimage" Type="String" />
                  </InsertParameters>
                  <UpdateParameters>
                      <asp:Parameter Name="firststimage" Type="String" />
                      <asp:Parameter Name="secondimage" Type="String" />
                      <asp:Parameter Name="thirdimage" Type="String" />
                      <asp:Parameter Name="forthimage" Type="String" />
                      <asp:Parameter Name="fifthimage" Type="String" />
                      <asp:Parameter Name="id" Type="Int32" />
                  </UpdateParameters>
              </asp:SqlDataSource>
              <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
                  ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                  DeleteCommand="DELETE FROM [slidshow] WHERE [id] = @id" 
                  InsertCommand="INSERT INTO [slidshow] ([firststimage], [secondimage], [thirdimage], [forthimage], [fifthimage]) VALUES (@firststimage, @secondimage, @thirdimage, @forthimage, @fifthimage)" 
                  SelectCommand="SELECT * FROM [slidshow]" 
                  UpdateCommand="UPDATE [slidshow] SET [firststimage] = @firststimage, [secondimage] = @secondimage, [thirdimage] = @thirdimage, [forthimage] = @forthimage, [fifthimage] = @fifthimage WHERE [id] = @id">
                  <DeleteParameters>
                      <asp:Parameter Name="id" Type="Int32" />
                  </DeleteParameters>
                  <InsertParameters>
                      <asp:Parameter Name="firststimage" Type="String" />
                      <asp:Parameter Name="secondimage" Type="String" />
                      <asp:Parameter Name="thirdimage" Type="String" />
                      <asp:Parameter Name="forthimage" Type="String" />
                      <asp:Parameter Name="fifthimage" Type="String" />
                  </InsertParameters>
                  <UpdateParameters>
                      <asp:Parameter Name="firststimage" Type="String" />
                      <asp:Parameter Name="secondimage" Type="String" />
                      <asp:Parameter Name="thirdimage" Type="String" />
                      <asp:Parameter Name="forthimage" Type="String" />
                      <asp:Parameter Name="fifthimage" Type="String" />
                      <asp:Parameter Name="id" Type="Int32" />
                  </UpdateParameters>
              </asp:SqlDataSource>
              </div></div></section>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsCPH" Runat="Server">
</asp:Content>

