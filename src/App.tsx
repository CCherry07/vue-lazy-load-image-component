import { defineComponent } from 'vue'
import LazyLoadComponent from './components/LazyLoadComponent.tsx'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div id="app">
        <LazyLoadComponent
          height={200}
          width={200}
          style={{ backgroundColor: 'red' }}
          useIntersectionObserver={true}
          threshold={100}
        >
          <div>123</div>
        </LazyLoadComponent>
      </div>
    )
  }
})



