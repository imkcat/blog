---
title: "快速上手 Kubernetes"
author: "Kcat"
date: "2020-09-29"
readTime: "5 min read"
tags: []
---

## 什么是 Kubernetes?

`Kubernetes` 是一个可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化

`Kubernetes` 源于希腊语，意为 `舵手` 或 `飞行员`。Google 在 2014 年开源了 Kubernetes 项目


## 为什么需要 Kubernetes?

### 部署方式的演变

让我们回到过去，下图是部署方式的一个演变过程

![container_evolution](/images/getting-started-with-kubernetes/container_evolution.jpg)


**传统部署时代：** 早期，组织在物理服务器上运行应用程序。无法为物理服务器中的应用程序定义资源边界，这会导致资源分配问题。例如，如果在物理服务器上运行多个应用程序，则可能会出现一个应用程序占用大部分资源的情况，结果可能导致其他应用程序的性能下降。一种解决方案是在不同的物理服务器上运行每个应用程序，但是由于资源利用不足而无法扩展，并且组织维护许多物理服务器的成本很高。

**虚拟化部署时代：** 作为解决方案，引入了虚拟化功能，它允许您在单个物理服务器的 CPU 上运行多个虚拟机（VM）。虚拟化功能允许应用程序在 VM 之间隔离，并提供安全级别，因为一个应用程序的信息不能被另一应用程序自由地访问。

因为虚拟化可以轻松地添加或更新应用程序、降低硬件成本等等，所以虚拟化可以更好地利用物理服务器中的资源，并可以实现更好的可伸缩性。

每个 VM 是一台完整的计算机，在虚拟化硬件之上运行所有组件，包括其自己的操作系统。

**容器部署时代：** 容器类似于 VM，但是它们具有轻量级的隔离属性，可以在应用程序之间共享操作系统（OS）。因此，容器被认为是轻量级的。容器与 VM 类似，具有自己的文件系统、CPU、内存、进程空间等。由于它们与基础架构分离，因此可以跨云和 OS 分发进行移植。


### Kubernetes 提供了什么

- 服务发现和负载均衡
- 存储编排
- 自动部署和回滚
- 定制化资源
- 自我修复
- 密钥与配置管理


## kubectl - Kubernetes 的 CLI

### 简介

当需要和 Kubernetes 交互，就需要一些工具了，这个时候便需要 `kubectl` 了


### 前置条件

- Snap(Ubuntu)
  
  一般情况下 Ubuntu 自带，无需安装

- [Homebrew](https://brew.sh)(macOS)
  
  需额外安装，请使用下面的命令进行安装
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  ```


### 安装

首先需要安装 kubectl，不同的平台安装上会有些不一样

> 下面只涵盖了一些主要代表性平台，如需要更详细的安装，请参考 [官方安装文档](https://kubernetes.io/docs/tasks/tools/install-kubectl)


#### Ubuntu

Ubuntu 可使用 Snap 来安装

```bash
$ sudo snap install kubectl --classic
```


#### macOS

macOS 可使用 Homebrew 来安装

```bash
$ brew install kubectl
```


### 测试一下

```bash
$ kubectl config view
```

应该会输出以下内容，以下内容一般为 `~/.kube/conifg` 文件的内容

```bash
apiVersion: v1
clusters: null
contexts: null
current-context: ""
kind: Config
preferences: {}
users: null
```


### 常用命令参考

> 由于我们还没有搭建集群，所以下面的命令可能无法工作，先 [搭建一个集群](#kind---快速搭建测试环境-kubernetes-集群-的工具) 再使用下面的命令

#### get

获取资源

```bash
# 列出所有的 Pod
$ kubectl get pods

# 列出所有的 Service
$ kubectl get service
```


#### create

创建资源

```bash
# 创建一个 ClusterIP 类型 的 Service
$ kubectl create service clusterip my-cs --tcp=5678:8080
```


#### apply

应用配置

```bash
# 应用一个配置文件
$ kubectl apply -f deployment.yaml
```


## kind - 快速搭建测试环境 Kubernetes 集群 的工具

既然我们已经有了 kubectl，那必须需要一个 Kubernetes 集群来进行操作，`kind` 便是为了这样的需求产生的。kind 是一个能够在容器中运行的 Kubernetes 集群，这样便可以快速的搭建一个 **测试环境** 的 Kubernetes 集群

> 目前 kind 有一个 **非常严重** 的 bug，当重启机子时集群便无法正常工作，官方团队也在修复中，所以请勿在生产环境中使用 kind，后果自负，当然也不能怪罪于 kind，因为 kind 目的就是为了快速搭建一个开发测试环境的集群，生产环境的搭建会更加复杂，可以使用 k3s，kubespray 等面向生产环境的工具来进行搭建


### 前置条件

- Docker
  
  推荐添加国内源，以便加速拉取镜像时的速度

- Golang 1.11+
  
  推荐添加加速源，以便加速下载包的速度


### 安装

```bash
$ GO111MODULE="on" go get sigs.k8s.io/kind@v0.9.0
```

### 创建一个单节点的集群

```bash
$ kind create cluster

Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.19.1) 🖼 
 ✓ Preparing nodes 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
Set kubectl context to "kind-kind"
```

### 查看节点

```bash
$ kubectl get nodes

NAME                 STATUS   ROLES    AGE   VERSION
kind-control-plane   Ready    master   66s   v1.19.1
```


### 删除集群

```bash
$ kind delete cluster

Deleting cluster "kind" ...
```


### 创建一个多节点的集群

创建多节点集群的时候需要使用到 kind 的 [配置文件](https://kind.sigs.k8s.io/docs/user/configuration/)

我们创建一个配置文件：`config.yaml`

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
# 一个控制平台节点和三个工作节点
#
# 另外我们添加了一个简单的端口映射，以便我们后期使用
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 32000
    hostPort: 8080
    protocol: TCP
- role: worker
- role: worker
- role: worker
```

我们创建完成配置文件后，还需要在 kind 创建集群的时候指定配置文件

```bash
$ kind create cluster --config=config.yaml

Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.19.1) 🖼
 ✓ Preparing nodes 📦 📦 📦 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
 ✓ Joining worker nodes 🚜 
Set kubectl context to "kind-kind"
```

我们来看一下集群的节点，应该已经有了三个工作节点

```bash
$ kubectl get nodes

NAME                 STATUS   ROLES    AGE   VERSION
kind-control-plane   Ready    master   11m   v1.19.1
kind-worker          Ready    <none>   10m   v1.19.1
kind-worker2         Ready    <none>   10m   v1.19.1
kind-worker3         Ready    <none>   10m   v1.19.1
```


## helm - 让 Kubernetes 中的应用程序搭建也像包管理一样容易

> Helm 不是 Kubernetes 中必须使用的，它是额外的工具

当我们需要在 Kubernetes 中部署一些比较流行的应用时，一般情况下，我们如果按照在 Kubernetes 中正常的部署方式的话，要编写 deployment.yaml 这类若干个部署文件，对于部署私有的应用来说是没有办法的，是必须编写的，但是对于类似 Elasticsearch 这类非常流行的应用来说，其实应该无需重复性编写大量的文件即可进行部署的，`Helm` 就是为了让部署 Kubernetes 应用也像使用 Docker Hub 一样方便

### 前置条件

- Kubernetes 集群


### 安装

#### Ubuntu

```bash
$ sudo snap install helm --classic
```

#### macOS

```bash
$ brew install helm
```

### 基本概念

#### Chart

Helm 是以 Chart 为单位来安装部署的，Chart 就是 Helm 的一个包，包含了这个应用所有的资源


#### Repository

Repository 顾名思义，是 Helm 的安装源，它收集和分享 Chart


#### Release

Release 是一个 Chart 的实例，一个 Chart 当然可以在一个集群中安装许多次，每一次的安装都会产生一个 Release


### 添加一个源

我们添加 Kubernetes-Dashboard 的安装源

```bash
$ helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
```


### 更新源

> 当添加过源后，一般情况下，不会获取更新，在安装前最好更新一下

```bash
$ helm repo update
```


### 安装与卸载

如果在网络环境非常好，并无什么特(wu)殊(fa)原(fan)因(qiang)的情况下才能拉取的资源时，如果不需要一些自定义的额外设置时，安装是一种 `享受♂︎`，下面会对比两种不同安装方式的区别


#### 默认安装

> 默认安装会有一些需要注意的要点：
>
> - 安装至 **default** 命名空间
> - 可以使用 `helm uninstall` 进行卸载删除

我们使用之前添加的 Kubernetes Dashboard 的源进行安装

```bash
$ helm install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard

NAME: kubernetes-dashboard
LAST DEPLOYED: Mon Sep 28 15:36:07 2020
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
*********************************************************************************
*** PLEASE BE PATIENT: kubernetes-dashboard may take a few minutes to install ***
*********************************************************************************

Get the Kubernetes Dashboard URL by running:
  export POD_NAME=$(kubectl get pods -n default -l "app.kubernetes.io/name=kubernetes-dashboard,app.kubernetes.io/instance=kubernetes-dashboard" -o jsonpath="{.items[0].metadata.name}")
  echo https://127.0.0.1:8443/
  kubectl -n default port-forward $POD_NAME 8443:8443
```

我们可以使用 `helm list` 查看我们所有已安装的 Chart

```bash
$ helm list

NAME                	NAMESPACE	REVISION	UPDATED                                	STATUS  	CHART                     	APP VERSION
kubernetes-dashboard	default  	1       	2020-09-28 16:21:25.248458125 +0800 CST	deployed	kubernetes-dashboard-2.7.1	2.0.4
```

我们可以使用 `helm uninstall` 进行卸载

```bash
$ helm uninstall kubernetes-dashboard

release "kubernetes-dashboard" uninstalled
```


#### 安装至指定的命名空间

> 安装至指定的命名空间需要注意的地方：
> 
> - 不会显示在 `helm list` 中
> - 无法使用 `helm uninstall` 安装

```bash
$ kubectl create namespace kubernetes-dashboard

namespace/kubernetes-dashboard created

$ helm install kubernetes-dashboard -n kubernetes-dashboard kubernetes-dashboard/

NAME: kubernetes-dashboard
LAST DEPLOYED: Mon Sep 28 16:32:32 2020
NAMESPACE: kubernetes-dashboard
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
*********************************************************************************
*** PLEASE BE PATIENT: kubernetes-dashboard may take a few minutes to install ***
*********************************************************************************

Get the Kubernetes Dashboard URL by running:
  export POD_NAME=$(kubectl get pods -n kubernetes-dashboard -l "app.kubernetes.io/name=kubernetes-dashboard,app.kubernetes.io/instance=kubernetes-dashboard" -o jsonpath="{.items[0].metadata.name}")
  echo https://127.0.0.1:8443/
  kubectl -n kubernetes-dashboard port-forward $POD_NAME 8443:8443
```

如果使用 `helm list` 则会发现没有 Kubernetes Dashboard 的 Chart

```bash
$ helm list

NAME	NAMESPACE	REVISION	UPDATED	STATUS	CHART	APP VERSION
```

由于我们指定了命名空间，所以 helm 会把所有的资源安装在指定的命名空间，既然这样，我们便可以使用 `kubectl` 来查看资源：

```bash
$ kubectl get pods -n kubernetes-dashboard

NAME                                    READY   STATUS    RESTARTS   AGE
kubernetes-dashboard-5598bc4755-bc5td   1/1     Running   0          18m
```

如果我们需要删除我们之前安装的 Kubernetes Dashboard 的话，那么我们就需要删除这个命名空间（当然我们不需要删除，因为我们需要让 Kubernetes Dashboard 工作起来）

```bash
$ kubectl delete namespace kubernetes-dashboard

namespace "kubernetes-dashboard" deleted
```


## 最后的工作，让 Kubernetes Dashboard 工作起来

我们前前后后粗略的了解了 `kubectl`, `kind` 和 `Helm` 等工具的使用，而且我们还部署了 Kubernetes Dashboard，但是我们却无法访问，那我们现在就来让 Kubernetes Dashboard 工作起来


### 绑定 Kubernetes Dashboard 端口

我们之前在 kind 的 `config.yaml` 配置文件中定义了一个容器 `32000` 映射为主机 `8080` 端口，这个 `8080` 端口就是我们在主机上用来访问 Kubernetes Dashboard 的端口

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 32000
    hostPort: 8080
    protocol: TCP
- role: worker
- role: worker
- role: worker
```

我们可以获取一下 `Service`，Service 是用来描述 Pods 网络的抽象层

```bash
$ kubectl get svc -n kubernetes-dashboard

NAME                   TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
kubernetes-dashboard   ClusterIP   10.96.93.33   <none>        443/TCP   20m
```

我们需要更改这个 Service，使用 `kubectl edit` 来进行更改

```bash
$ kubectl edit svc kubernetes-dashboard -n kubernetes-dashboard
```

命令会输出 Service 的配置文件，如下所示：

```yaml
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
kind: Service
metadata:
  annotations:
    meta.helm.sh/release-name: kubernetes-dashboard
    meta.helm.sh/release-namespace: kubernetes-dashboard
  creationTimestamp: "2020-09-28T10:01:04Z"
  labels:
    app.kubernetes.io/component: kubernetes-dashboard
    app.kubernetes.io/instance: kubernetes-dashboard
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/name: kubernetes-dashboard
    app.kubernetes.io/version: 2.0.4
    helm.sh/chart: kubernetes-dashboard-2.7.1
    kubernetes.io/cluster-service: "true"

... 内容过长，此处省略若干字

spec:
  clusterIP: 10.96.93.33
  ports:
  - name: https
    port: 443
    protocol: TCP
    targetPort: https
  selector:
    app.kubernetes.io/component: kubernetes-dashboard
    app.kubernetes.io/instance: kubernetes-dashboard
    app.kubernetes.io/name: kubernetes-dashboard
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
```

我们输入完命令之后，一般会调用系统的 vim 编辑器来编辑，上面的内容较长，但是我们其实只要修改的是 `spec` 部分，我们需要更改的有以下几个地方：

- `spec.type` 由 `ClusterIP` 改为 `NodePort`，NodePort 类型是暴露 Service 的一种方式，自定义一个端口（端口范围：30000-32767）暴露出来，如果不指定端口，它会自动创建一个端口
- 在 `spec.ports` 中 `https` 中添加 `nodePort: 32000`

修改后的 spec 将会是下面这样，下面是仅 spec 部分的修改部分:

```yaml
spec:
  clusterIP: 10.96.93.33
  ports:
  - name: https
    port: 443
    protocol: TCP
    targetPort: https
    nodePort: 32000
  selector:
    app.kubernetes.io/component: kubernetes-dashboard
    app.kubernetes.io/instance: kubernetes-dashboard
    app.kubernetes.io/name: kubernetes-dashboard
  sessionAffinity: None
  type: NodePort
```

我们保存即可，保存后，Kubernetes 便会应用更改，会输出下面的已修改的提示

```bash
service/kubernetes-dashboard edited
```

我们可以查看一下修改后的 Service，我们可以看到类型已经变成了 NodePort 类型，并且 443 端口映射了 32000 端口

```bash
$ kubectl get svc -n kubernetes-dashboard

NAME                   TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)         AGE
kubernetes-dashboard   NodePort   10.96.204.0   <none>        443:32000/TCP   3m38s
```


### 访问 Kubernetes Dashboard

我们现在便可以打开我们的浏览器，输入 https://127.0.0.1:8080，访问一下，有可能，你会遇见下面的这个页面，点击高级也没有访问的入口

![cert_invalid](/images/getting-started-with-kubernetes/cert_invalid.jpg)

不要慌！就在浏览器页面上，敲下字符 `thisisunsafe`，奇迹就会发生！页面则会进入 Kubernetes Dashboard 的登录页面

![dashboard_login](/images/getting-started-with-kubernetes/dashboard_login.jpg)


### 创建用户

我们虽然目前能够访问 Kubernetes Dashboard，但是我们却无法进入，因为我们并没有创建用户，我们下面就开始创建用户

我们需要使用 `kubectl apply` 来进行一系列的操作

首先我们需要创建 `admin-user` 的 `ServiceAccount` 用户

```bash
$ cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
EOF

serviceaccount/admin-user created
```

我们还需要对 `admin-user` 创建 `ClusterRoleBinding` 的绑定

```bash
$ cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF

clusterrolebinding.rbac.authorization.k8s.io/admin-user created
```

做完了这些我们便可以获取 Access Token 了，输入以下的命令

```bash
$ kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')

Name:         admin-user-token-vm99k
Namespace:    kubernetes-dashboard
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: admin-user
              kubernetes.io/service-account.uid: c864d3d0-6e2a-4fcd-9cca-a1dd465048f9

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1066 bytes
namespace:  20 bytes
token:      <access token>
```

`<access token>` 便是我们需要的，我们是通过 `kubectl describe secret` 这个命令来描述我们之前创建的 secret，既然已经获取到 `token`, 我们便可以填入进行登录，登录后，便可以看到 Dashboard 的 Overview 部分，看到所有的资源情况

![dashboard_overview](/images/getting-started-with-kubernetes/dashboard_overview.jpg)

在左侧的侧边栏中，点击 `nodes`，我们便可以看到目前这个集群中的所有节点

![dashboard_nodes](/images/getting-started-with-kubernetes/dashboard_nodes.jpg)

