import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import styles from './christmas.module.scss'
// 导入gltf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入draco解码器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Water } from './Water2'
const Christmas = () => {
  const canvasDom = useRef<HTMLDivElement>(null)
  let requestAnimation: number
  // 创建场景
  const scene = new THREE.Scene()
  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    45, // 视角
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 2, 6)
  camera.lookAt(0, 0, 0)
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true // 抗锯齿
  })
  // 创建轨道控制器
  const controller = new OrbitControls(camera, renderer.domElement)
  // 设置带阻尼的惯性
  controller.enableDamping = true
  // 设置阻尼系数
  controller.dampingFactor = 0.05 // 数值越小，惯性越大
  function onresize() {
    renderer.setSize(
      canvasDom.current!.offsetWidth,
      canvasDom.current!.offsetHeight
    )
    // 重置相机宽高比
    camera.aspect =
      canvasDom.current!.offsetWidth / canvasDom.current!.offsetHeight
    // 更新相机投影矩阵
    camera.updateProjectionMatrix()
  }
  // 初始化渲染器，渲染背景
  renderer.setClearColor('#000')
  scene.background = new THREE.Color('#ccc')
  // 添加网格地面
  const gridHelper = new THREE.GridHelper()
  gridHelper.material.opacity = 0.2
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('/textures/sky.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
  })
  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1)
  light1.position.set(0, 0, 10)
  scene.add(light1)

  // 修改色调映射为电影相关
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5 // 曝光度
  renderer.shadowMap.enabled = true // 允许光源阴影

  //   创建水面
  const waterGeometry = new THREE.CircleGeometry(300, 32)
  const waterMesh = new Water(waterGeometry, {
    textureHeight: 1024,
    textureWidth: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1), // 水纹方向
    scale: 100
  })
  waterMesh.rotation.x = -Math.PI / 2
  waterMesh.position.y = -0.4
  scene.add(waterMesh)
  // 创建点光源
  const pointLight = new THREE.PointLight(0xffffff, 50)
  pointLight.position.set(0.1, 2.4, 0)
  pointLight.castShadow = true
  scene.add(pointLight)

  //   创建点光源组
  const pointLightGroup = new THREE.Group()
  pointLightGroup.position.set(-8, 2.5, -1.5)
  let pointLightArr: THREE.Mesh[] = []
  const radius = 2
  for (let i = 0; i < 3; i++) {
    const pointLight = new THREE.PointLight(0xffffff, 1)
    // 创建球体等灯泡
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 10
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    sphere.position.set(
      radius * Math.cos((i * 2 * Math.PI) / 3),
      Math.cos((i * 2 * Math.PI) / 3),
      radius * Math.sin((i * 2 * Math.PI) / 3)
    )
    sphere.add(pointLight)
    pointLightArr.push(sphere)
    pointLightGroup.add(sphere)
  }

  scene.add(pointLightGroup)
  // 使用补间函数，从0到2π，使灯泡旋转
  let options = {
    angle: 0
  }
  gsap.to(options, {
    angle: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: 'linear',
    onUpdate: () => {
      pointLightGroup.rotation.y = options.angle
      pointLightArr.forEach((item, index) => {
        item.position.set(
          radius * Math.cos((index * 2 * Math.PI) / 3),
          Math.cos((index * 2 * Math.PI) / 3 + options.angle * 5),
          radius * Math.sin((index * 2 * Math.PI) / 3)
        )
      })
    }
  })
  function animate() {
    controller && controller.update()
    renderer.render(scene, camera)
    requestAnimation = window.requestAnimationFrame(animate)
  }
  useEffect(() => {
    animate()
    canvasDom.current!.appendChild(renderer.domElement)
    const gltfLoader = new GLTFLoader()
    // 实例化加载器draco
    const dracoLoader = new DRACOLoader()
    // 设置draco路径
    dracoLoader.setDecoderPath(window.location.origin + '/draco/')
    // 设置gltf加载器draco解码器
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load(
      // 模型路径
      '/models/scene.glb',
      // 加载完成回调
      (gltf) => {
        scene.add(gltf.scene)
        gltf.scene.traverse((child) => {
          // 隐藏原水面
          if (child.name === 'Plane') {
            child.visible = false
          }
          if ((child as THREE.Mesh)?.isMesh) {
            // 物体允许发射阴影和接收阴影
            child.castShadow = true
            child.receiveShadow = true
          }
        })
      }
    )

    return () => {
      window.cancelAnimationFrame(requestAnimation)
    }
  }, [])
  useEffect(() => {
    onresize()
    window.addEventListener('resize', onresize)
    return () => {
      window.removeEventListener('resize', onresize)
    }
  }, [])
  return (
    <div className="page-container">
      <div
        id="canvasDom"
        className={styles.canvasContainer}
        ref={canvasDom}
      ></div>
    </div>
  )
}

export default Christmas
