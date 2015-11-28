<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="slideshow">
      <div class="tp-banner-container">
        <div class="tp-banner">
          <ul>
              <asp:Repeater ID="Repeater1" runat="server" DataSourceID="sdsslider">
            <ItemTemplate>
            
            <li data-transition="random" data-slotamount="7" data-masterspeed="1500">
              <!-- MAIN IMAGE -->
              <img src="images/<%# Eval("firststimage")%>" alt="" data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat">
              <div class="slideshow-bg"
						data-y="310"
						data-x="center"
						data-start="0"></div>
              <div class="slide-p tp-caption black randomrotate skewtoleft tp-resizeme start" 
							data-x="right" 
							data-hoffset="0" 
							data-y="50" 
							data-speed="500" 
							data-start="1300" 
							data-easing="Power3.easeInOut" 
							data-splitin="none" 
							data-splitout="none" 
							data-elementdelay="0.1" 
							data-endelementdelay="0.1" 
							data-endspeed="500"><img src="images/<%# Eval("secondimage")%>"> </div>
              <div class="slide-a tp-caption customin"
							data-x="left"
							data-y="150"
							data-hoffset="100"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="1800"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 4"><img src="images/<%# Eval("thirdimage")%>"> </div>
              <div class="slide-a slide-a-2 tp-caption customin"
							data-x="left"
							data-y="200"
							data-hoffset="100"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="2100"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 4"><img src="images/<%# Eval("forthimage")%>"> </div>
              <div class="slide-a slide-a-2 tp-caption customin"
							data-x="left"
							data-y="290"
							data-hoffset="100"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="2100"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 4"><img src="images/<%# Eval("fifthimage")%>"> </div>
            </li>
            </ItemTemplate>
              </asp:Repeater>
              <asp:SqlDataSource ID="sdsslider" runat="server" 
                  ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                  SelectCommand="SELECT * FROM [slidshow]"></asp:SqlDataSource>
            <li data-transition="random" data-slotamount="7" data-masterspeed="1500">
            
              <img src="images/slideshow.jpg" alt="" data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat">
              <div class="slideshow-bg"
						data-y="310"
						data-x="center"
						data-start="0"></div>
              <div class="slide-p tp-caption black randomrotate skewtoleft tp-resizeme start" 
							data-x="20" 
							data-hoffset="0" 
							data-y="50" 
							data-speed="500" 
							data-start="1300" 
							data-easing="Power3.easeInOut" 
							data-splitin="none" 
							data-splitout="none" 
							data-elementdelay="0.1" 
							data-endelementdelay="0.1" 
							data-endspeed="500"><img src="images/slider-girl1.png"> </div>
              <div class="slide-a tp-caption customin"
							data-x="800"
							data-y="150"
							data-hoffset="100"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="1800"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 4"><img src="images/making.png"> </div>
              <div class="slide-a slide-a-2 tp-caption customin"
							data-x="800"
							data-y="200"
							data-hoffset="-100"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="2100"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 4"><img src="images/money.png"> </div>
              <div class="slide-a slide-a-2 tp-caption customin"
							data-x="800"
							data-y="290"
							data-hoffset="-100"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="2100"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 4"><img src="images/today.png"> </div>
            </li>
          </ul>
        </div>
      </div>
	  <!-- End tp-banner-container -->
    </div>
	<!-- InstanceEndEditable -->
<!-- End slideshow -->
<!-- InstanceBeginEditable name="EditRegion4" -->
<div class="sections" style="background:#fff; padding:30px 0 ">
   

    <asp:SqlDataSource ID="sdsmissionandvission" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        SelectCommand="SELECT [PageContents] FROM [Pages] WHERE ([SlugUrl] = @SlugUrl)">
        <SelectParameters>
            <asp:Parameter DefaultValue="missionandvission" Name="SlugUrl" Type="String" />
        </SelectParameters>
    </asp:SqlDataSource>

      <div class="container">
       <asp:FormView ID="FormView1" runat="server" DataSourceID="sdsmissionandvission">
      
        <ItemTemplate>
            <asp:Label ID="PageContentsLabel" runat="server" 
                Text='<%# Bind("PageContents") %>' />
            <br />

        </ItemTemplate>
    </asp:FormView>
  
  </div>
</div>
<!-- InstanceEndEditable --><!-- InstanceBeginEditable name="EditRegion5" -->
<div class="shadow2"></div>

	<div class="sections sections-padding-b-50" style="padding-top:30px; padding-bottom:0" >
      <div class="container">
      
          <asp:FormView ID="FormView2" runat="server" DataSourceID="welcome">
      
        <ItemTemplate>
            <asp:Label ID="PageContentsLabel" runat="server" 
                Text='<%# Bind("PageContents") %>' />
            <br />

        </ItemTemplate>
    </asp:FormView>
      <asp:SqlDataSource ID="welcome" runat="server" 
        ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
        SelectCommand="SELECT [PageContents] FROM [Pages] WHERE ([SlugUrl] = @SlugUrl)">
        <SelectParameters>
            <asp:Parameter DefaultValue="welcome" Name="SlugUrl" Type="String" />
        </SelectParameters>
    </asp:SqlDataSource>
  <div class="col-md-12">
          <div class="col-md-3"> <a href="NewsLetter.aspx"><img src="images/get.jpg"></a> <a href="Gallry.aspx"><img src="images/picturegallery.jpg"></a><a href="Calback.aspx"> <img src="images/callback.jpg"></a><a href="Login.aspx"><img src="images/client-login.jpg"></a> </div>
          <div class="col-md-6 tablet" style="padding-bottom:20px">
            <div class="projects">
              <div class="head-title">
                <h6>Our Complete Projects</h6>
              </div>
                <asp:Repeater ID="Repeater2" runat="server" DataSourceID="sdshomeimages">
                <ItemTemplate>


              <div class="col-md-12" style="padding-left:0"> <img src="Uploads/<%# Eval("pic") %>" align="left">
                  <h5><%# Eval("title") %></h5>
               <%# Eval("description")%> <a href="Projects.aspx">more</a>
                  <div class="clearfix"></div>
              </div>
              <div class="line3"></div>
              </ItemTemplate>
                </asp:Repeater>


                <asp:SqlDataSource ID="sdshomeimages" runat="server" 
                    ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                    SelectCommand="SELECT top 2 * FROM [homepageProjects]"></asp:SqlDataSource>
           <%--   <div class="col-md-12" style="padding-left:0"> <img src="images/project1.jpg" align="left">
                  <h5>Project 2</h5>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard d <a href="#">more</a>
                  <div class="clearfix"></div>
              </div>--%>
            </div>
          </div>
          <div class="col-md-3" style="text-align:center">
            <div class="row">
              <div class="bxslider-slide bxslider-slide-title testimonials-slide">
              <div class="col-md-12">
                <div class="indus">News Update</div>
              </div>
              <ul>
                  <asp:Repeater ID="Repeater3" runat="server" DataSourceID="news">
                  <ItemTemplate>
                  
                
                 
                <li>
                  <div class="col-md-12">
                    <div class="testimonial-item">
                      <div class="testimonial-content">
                        <div style="text-align:center"><img src="Uploads/<%# Eval("pic") %>"></div>
                        <p>  <%# Eval("contentent")%></p></div>
                      <!-- End testimonial-content -->
                      <div class="clearfix"></div>
                      <div class="shadow3"></div>
                    </div>
                    <!-- End testimonial-item -->
                  </div>
                </li>
 </ItemTemplate>
                  </asp:Repeater>
                  <asp:SqlDataSource ID="news" runat="server" 
                      ConnectionString="<%$ ConnectionStrings:myesicoConnectionString %>" 
                      SelectCommand="SELECT * FROM [News]"></asp:SqlDataSource>


            
                  <!-- End testimonial-item -->
               
              </ul>
            </div>
            <!-- End testimonials-slide -->
          </div>
          <!-- End row -->
        </div>
      </div>
	  <!-- End row -->
    </div>
</div>
</asp:Content>
