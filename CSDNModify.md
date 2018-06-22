# CSDN修改文档

# ckbuilder
ckeditor 使用 Java 作为打包语言，所以修改ck 需要安装 java 环境

**下载** 

[Oracle Technology Network > Java > Java SE > Downloads](http://www.oracle.com/technetwork/java/javase/downloads/index.html)  点击 download 按钮跳转页面 选择 mac 对应的安装包下载

### 配置环境变量
**ckbuilder 也需要java 打包环境**

*运如果行 `java -version` 出来版本信息就可以不手动配置*

（1）确认本机所使用的shell是哪个：zsh/bash
在命令行中输入`echo $SHELL` ，
如果输出`/bin/bash`则为bash，
如果输出结果为 `/bin/zsh`则为zsh。

（2）根据上面不同的结果修改不同的shell配置文件
若为bash，则打开 `~/.bash_profile`，若为zsh打开`~/.zshrc`。

在相应的文件末尾添加以下内容，并保存，

    export JAVA_HOME=$(/usr/libexec/java_home)
    
在~/目录，命令行执行`source`命令，`source .bash_profile` 或 `source .zshrc`。

执行`java -version`出现JDK的版本信息即已配置成功。


