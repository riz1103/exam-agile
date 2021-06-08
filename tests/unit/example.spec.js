import { shallowMount } from '@vue/test-utils'
import Principles from '@/pages/Principles.vue'

describe('HelloWorld.vue', () => {
  test('is vue instance', () => {
    const wrapper = shallowMount(Principles, {
      propsData: { task:{
        name: 'principles',
        completed: false
      } 
    }
    })
    expect(wrapper.isVueInstance()).tobeTruthy();
  });

  
})
