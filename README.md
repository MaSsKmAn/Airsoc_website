# Drone-Lectures-2024-25
This repository contains the code and resources for the internal Drone Lectures held in AirSoc-IITR 2024-25.

## Pre-requisites for set-up:
- You system should have ubuntu-22.04 LTS Desktop running.

## PX4 Environment setup with ROS2 & Gazebo

### 1. First update the debian packages on your system :  
- Run these commands in your terminal
```
sudo apt install git
sudo apt update
sudo apt upgrade -y
```

### 2. Install and Set-Up ROS2-humble :
- Make sure you have a locale which supports UTF-8
```
locale  # check for UTF-8

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

locale  # verify settings
```
- Setup Sources
```
sudo apt install software-properties-common
sudo add-apt-repository universe
```
```
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```
```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```
- Install ROS 2 packages
```
sudo apt update
sudo apt upgrade
sudo apt install ros-humble-desktop
```
- Colcon Install and setup
```
sudo apt update
sudo apt install python3-colcon-common-extensions
sudo apt install python3-pip
pip3 list | grep setuptools
pip3 install setuptools==58.2.0
```
- Run this command to permanantly source your ros2 environment
```
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
echo "source /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash" >> ~/.bashrc
```

### 3. Install PX4 firmware :
```
cd ~
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
bash ./PX4-Autopilot/Tools/setup/ubuntu.sh
sudo reboot
```
- Please make sure that there is no error while cloning the PX4-Autopilot repository as otherwise it will cause issues in further steps.

### 4. Install ROS2 dependencies :
```
pip install --user -U empy==3.3.4 pyros-genmsg setuptools
sudo apt install python3-colcon-common-extensions
sudo apt install ros-humble-desktop python3-argcomplete
sudo apt install ros-dev-tools
```

### 5. Install XRCE-DDS Agent :
Installing XRCE-DDS Agent for accessing uORB topics from ROS2 topics.
```
cd ~
git clone https://github.com/eProsima/Micro-XRCE-DDS-Agent.git
cd Micro-XRCE-DDS-Agent
mkdir build
cd build
cmake ..
make
sudo make install
sudo ldconfig /usr/local/lib/
```

### 6. Installing QGroundControl (GCS) :
```
sudo usermod -a -G dialout $USER
sudo apt-get remove modemmanager -y
sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
sudo apt install libfuse2 -y
sudo apt install libxcb-xinerama0 libxkbcommon-x11-0 libxcb-cursor-dev -y
cd ~
```
- Now download the app-image file from [here](https://d176tv9ibo4jno.cloudfront.net/latest/QGroundControl.AppImage) in your **<span style="color:orange">/home/username/</span>** directory.   
- Change the executable permissions for GCS & try to run it
```
cd ~
chmod +x ./QGroundControl.AppImage
./QGroundControl.AppImage
```
Close the terminal (by interrupting with **<span style="color:orange">ctrl + c</span>**) to close the QGroundControl.


### 7. Testing the PX4 setup :

- Build & launch the gazebo simulation with SITL
```
cd ~/PX4-Autopilot
make px4_sitl gz_x500
```   

- Run the XRCE-DDS Agent   
```
cd ~/Micro-XRCE-DDS-Agent/build
MicroXRCEAgent udp4 -p 8888
```
- Launch QGroundControl (GCS)
```
cd ~ && ./QGroundControl.AppImage
```

- In the SITL terminal (the one from where you launched gazebo), run the following command to arm & takeoff the drone
```
commander takeoff
```
