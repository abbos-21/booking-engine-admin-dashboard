<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

import { ref, onMounted } from 'vue'
import ApiService from '@/api'

const phoneNumber = ref<any>()
const password = ref<any>()
const data = ref<any>(null)

const login = async () => {
  try {
    data.value = await ApiService.loginAdmin(phoneNumber.value, password.value)
    toast({
      description: data.value.message,
      duration: 1000,
    })
    localStorage.setItem('token', data.value.token)
    location.reload()
  } catch (error: any) {
    console.log(error)
    toast({
      description: error.response.data.error,
      duration: 1000,
      variant: 'destructive',
    })
  }
}

onMounted(() => {
  localStorage.clear()
})
</script>

<template>
  <main class="min-h-screen flex flex-col justify-center items-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="tel">Phone number</Label>
          <Input id="tel" type="tel" required v-model="phoneNumber" />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required v-model="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="login"> Sign in </Button>
      </CardFooter>
    </Card>
  </main>
</template>
