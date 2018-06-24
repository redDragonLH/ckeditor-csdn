# CSDN_blog_editor
[ckREADME](./doc/ckeditorREADME.md)

[csdn修改文档](http://confluence.csdn.net/pages/viewpage.action?pageId=19601246)

## 开发环境
本项目代理到 `csdnimg.cn/release/` 下，不过在 blog项目 `config.php` 下做了灵活配置，开发和测试可以把在`config.php` url配置成本地url，确保开发和测试顺利。
## 上线
上线时会按照 package.json 内的版本号生成新的上线版本，所以每次上线需修改 package.json 的版本号，然后使用时使用相应的链接,

上线流程
* 修改 package.json 的版本号（[必读](./doc/SemVer)）
* 打tag
  * 把分支合并到`master`并`push`
  * 获取修改内容的 commit `git log`
  * `git tag -a v确定的版本号（版本号最好和package.json 保持一致） 得到的 commit`
  * push 版本号`git push origin v版本号`

## ckbuilder
打包器是一个单独项目，
[ckbuilder开源项目](https://github.com/ckeditor/ckbuilder)，
node 编写，编译成java

**因为是 ckeditor 是上线时构建，所以如要使用已修改的 ckbuilder 需把已修改的 ckbuilder 项目放到gitlab或开源项目,并修改 ckeditor `./dev/builder/build.sh`文件的下载链接**

### java
ckeditor 使用 Java 作为打包语言，测试打包后的ck或者修改ckbuilder， 需要安装 java 环境


#### 下载 

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


