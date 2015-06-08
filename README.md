# ARDroneControllerV0.0.2
In previous version(0.0.1) I developed web interface for controlling Drone movement like take off, land forward and so on. In this version I tried do real time face recognition using Drone camera. Here I used OpenCV for Node.js. 
AR Drone Controller v 0.0.2
 
1) Install OpenCV on your platform 
Note: If you are not using OpenCV 2.x.x you need to do some additional stuff.
                Windows uses:
                  Create file called opencv.pc like this.
                  
                  
                  # Package Information for pkg-config
                  prefix=C:/Opencv/opencv
                  exec_prefix=C:/Opencv/build/x64/vc12/bin
                  libdir=${prefix}/build/x64/vc11/lib
                  includedir_old=${prefix}/build/include/opencv
                  includedir_new=${prefix}/build/include
                  
                  Name: OpenCV
                  Description: Open Source Computer Vision Library
                  Version: 2.4.9
                  Libs: ${libdir}/opencv_core249 ${libdir}/opencv_imgproc249 ${libdir}/opencv_highgui249 ${libdir}/opencv_ml249 ${libdir}/opencv_video249 ${libdir}/opencv_features2d249 ${libdir}/opencv_calib3d249 ${libdir}/opencv_objdetect249 ${libdir}/opencv_contrib249 ${libdir}/opencv_legacy249 ${libdir}/opencv_flann249
                  
                  Cflags: ${includedir_old} ${includedir_new}


Save it somewhere you like and add location where is opencv.pc located to $PATH environment variable.

2)Install ffmpeg package 
	Windows users:
	
	Download ffmpeg package (https://www.ffmpeg.org/download.html
	Save it in somewhere you like
	Set environment variable for ffmpeg /bin into $PATH environment variable
  
  Linux uses:
  
  Follow this link (http://wiki.razuna.com/display/ecp/FFmpeg+Installation+for+Ubuntu)
	
###Install this package 
1)	Download this git repository 
            
            git clone https://github.com/GPrathap/ARDroneControllerV0.0.2.git
2)	Go to  that directory 

 	        cd ARDroneControllerV0.0.2
3)	Type
          npm install 

That’s it. Now in order to start NodeJs server run 
          
          node server.js
then open browser and type
          
          localhost:3000
Yeap, you are done :)
