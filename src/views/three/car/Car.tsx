import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import styles from './car.module.scss'
// 导入gltf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入draco解码器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
const Car = () => {
  const canvasDom = useRef<HTMLDivElement>(null)
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
  // 添加世界坐标辅助器
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

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
  function render() {
    controller.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  let wheels = []
  // 车身，车前脸，引擎盖，挡风玻璃
  let carBody, frontCar, hoodCar, glassCar
  // 创建材质
  // 车身物理材质
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1, // 金属度
    roughness: 0.5, // 粗糙程度
    clearcoat: 1, // 清漆
    clearcoatRoughness: 0 // 清漆粗糙度
  })
  useEffect(() => {
    canvasDom.current!.appendChild(renderer.domElement)
    onresize()
    window.addEventListener('resize', onresize)
    // 初始化渲染器，渲染背景
    renderer.setClearColor('#000')
    scene.background = new THREE.Color('#ccc')
    render()
    // 添加网格地面
    const gridHelper = new THREE.GridHelper()
    gridHelper.material.opacity = 0.2
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // 实例化加载器gltf
    const gltfLoader = new GLTFLoader()
    // 实例化加载器draco
    const dracoLoader = new DRACOLoader()
    // 设置draco路径
    dracoLoader.setDecoderPath(window.location.origin + '/draco/')
    // 设置gltf加载器draco解码器
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load(
      // 模型路径
      '/models/bmw01.glb',
      // 加载完成回调
      (gltf) => {
        console.log(gltf)
        const bmw = gltf.scene
        scene.add(bmw)
        bmw.traverse((child) => {
          if ((child as THREE.Mesh)?.isMesh) {
            if (child.name.includes('轮毂')) {
              wheels.push(child)
            }
            if (child.name.includes('Mesh002')) {
              carBody = child as THREE.Mesh
              carBody.material = bodyMaterial
            }
            if (child.name.includes('前脸')) {
              frontCar = child as THREE.Mesh
            }
            if (child.name.includes('引擎盖_1')) {
              hoodCar = child as THREE.Mesh
            }
            if (child.name.includes('挡风玻璃')) {
              glassCar = child as THREE.Mesh
            }
          }
        })
      }
    )
    // 添加灯光
    const light1 = new THREE.DirectionalLight(0xffffff, 1)
    light1.position.set(0, 0, 10)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xffffff, 1)
    light2.position.set(0, 0, -10)
    scene.add(light2)
    const light3 = new THREE.DirectionalLight(0xffffff, 1)
    light3.position.set(10, 0, 10)
    scene.add(light3)
    const light4 = new THREE.DirectionalLight(0xffffff, 1)
    light4.position.set(-10, 0, 10)
    scene.add(light4)
    const light5 = new THREE.DirectionalLight(0xffffff, 1)
    light5.position.set(0, 10, 0)
    scene.add(light5)
    const light6 = new THREE.DirectionalLight(0xffffff, 1)
    light6.position.set(5, 10, 0)
    scene.add(light6)
    const light7 = new THREE.DirectionalLight(0xffffff, 1)
    light7.position.set(0, 10, 5)
    scene.add(light7)
    const light8 = new THREE.DirectionalLight(0xffffff, 1)
    light8.position.set(0, 10, -5)
    scene.add(light8)
    const light9 = new THREE.DirectionalLight(0xffffff, 1)
    light9.position.set(-5, 10, 0)
    scene.add(light9)
    return () => {
      window.removeEventListener('resize', onresize)
    }
  })
  return (
    <div className="page-container">
      {import.meta.env.PUBLIC_URL}
      <div className={styles.canvasContainer} ref={canvasDom}></div>
    </div>
  )
}

export default Car