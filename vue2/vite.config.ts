import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue2";
import { createHtmlPlugin } from "vite-plugin-html";
import AutoImport from "unplugin-auto-import/vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { ElementUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default defineConfig(({ mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const { VITE_TITLE } =
    env;

  // console.log('path=======>',path.resolve(__dirname, "./src"),path.resolve(root, "src/assets/svg"))
  return {
    base: "./",
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(root, "src/assets/svg")], // icon存放的目录
        symbolId: "icon-[name]", // symbol的id
        inject: "body-last", // 插入的位置
        customDomId: "__svg__icons__dom__" // svg的id
      }),
      VueSetupExtend(),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          {
            "@vueuse/core": [
              // import { useMouse } from '@vueuse/core',
              "useMouse",
              // import { useFetch as useMyFetch } from '@vueuse/core',
              ["useFetch", "useMyFetch"]
            ],
            "axios": [
              // default imports
              ["default", "axios"] // import { default as axios } from 'axios',
            ],
            "gz-sdk": [
              ["default", "GDK"]
            ],
            "lodash": [
              ["default", "lodash"]
            ],
            vue: [
              // "Vue",
              ["default", "Vue"]
            ]
            // ,
            // "[package-name]": [
            //   "[import-names]",
            //   // alias
            //   ["[from]", "[alias]"]
            // ]
          }],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        resolvers: [(name) => {
          if (name === "Message") {
            return {
              from: "element-ui",
              name: "Message",
              sideEffects: [
                "element-ui/lib/theme-chalk/base.css",
                "element-ui/lib/theme-chalk/message.css"
              ]
            };
          }
        }, ElementUiResolver()],
        eslintrc: {
          globalsPropValue: true,
          filepath: "./.eslintrc-auto-import.json",
          enabled: true	// 启用自动生成.eslintrc
        },
        dts: "./src/types/auto-imports.d.ts" // 可以自定义文件生成的位置，默认是根目录下
      }),
      Components({
        deep: true,
        dts: "./src/types/components.d.ts", // 可以自定义文件生成的位置，默认是根目录下
        resolvers: [ElementUiResolver()]
      }),
      vue({
        // @ts-ignore
        refTransform: true // 开启 ref 转换 $ref "@vue/compiler-sfc": "^3.2.5"
      }),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
      }),
      createHtmlPlugin({
        minify: true,
        pages: [
          {
            entry: "/src/main.ts",
            filename: "index.html",
            template: "public/index.html",
            injectOptions: {
              data: {
                title: VITE_TITLE
              },
              tags: [
                {
                  injectTo: "body-prepend",
                  tag: "div",
                  attrs: {
                    id: "modal"
                  }
                }
              ]
            }
          },
          {
            entry: "/src/main.ts",
            filename: "app.html",
            template: "public/app.html",
            injectOptions: {
              data: {
                title: VITE_TITLE
              },
              tags: [
                {
                  injectTo: "body-prepend",
                  tag: "div",
                  attrs: {
                    id: "modal"
                  }
                }
              ]
            }
          }
        ]
      })
    ],
    resolve: {
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@m": path.resolve(__dirname, "./node_modules")
      }
    },
    css: {
      preprocessorOptions: {
        // scss: { charset: false, additionalData: "@import \"@/assets/styles/patch.scss\";" },
        // css: { charset: false }
      }
    },
    server: {
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      https: false, // 是否开启 https
      port: 5173, // 端口号
      host: "0.0.0.0", // 监听所有地址
      proxy: { // 自定义代理规则
        // 设置代理，根据项目实际情况配置
        "/sys": {
          target: "http://boot3.jeecg.com/jeecgboot",// https://nest-api.buqiyuan.site/api/admin/
          changeOrigin: true,
          secure: false,
          rewrite: (path: string) => path.replace("/sys", "/")
        },
        "/ai": {
          target: "https://v2.api-m.com",
          changeOrigin: true,
          secure: false,
          rewrite: (path: string) => path.replace("/ai", "/")
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "element-ui": ["element-ui"]
          }
        }
      },
      // 设置最终构建的浏览器兼容目标
      target: "esnext",
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false
    }
  };
});
