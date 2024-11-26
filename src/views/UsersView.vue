<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApiService from '@/api'
import { useToast } from '@/components/ui/toast/use-toast'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { Trash2, PenLine, UserRoundPlus } from 'lucide-vue-next'

const { toast } = useToast()

const phoneNumber = ref<any>()
const password = ref<any>()
const name = ref<any>()
const role = ref<any>()

const registerUser = async () => {
  if (role.value === 'user') {
    try {
      const response = await ApiService.registerUser(phoneNumber.value, password.value, name.value)
      await getAllUsers()
      toast({
        description: response.message,
        duration: 1000,
      })
    } catch (error: any) {
      console.log(error)
      toast({
        description: error.response.data.error,
        duration: 1000,
        variant: 'destructive',
      })
    }
  } else {
    try {
      const response = await ApiService.registerAdmin(
        phoneNumber.value,
        password.value,
        name.value,
        localStorage.getItem('token'),
      )
      await getAllUsers()
      toast({
        description: response.message,
        duration: 1000,
      })
    } catch (error: any) {
      console.log(error)
      toast({
        description: error.response.data.error,
        duration: 1000,
        variant: 'destructive',
      })
    }
  }
}

const deleteUser = async (userId: any) => {
  try {
    const response = await ApiService.deleteUser(localStorage.getItem('token'), userId)
    await getAllUsers()
    toast({
      description: response.message,
      duration: 1000,
    })
  } catch (error: any) {
    console.log(error)
    toast({
      description: error.response.data.error,
      duration: 1000,
      variant: 'destructive',
    })
  }
}

const data = ref<any>(null)

const getAllUsers = async () => {
  try {
    data.value = await ApiService.getAllUsers(localStorage.getItem('token'))
  } catch (error: any) {
    console.log(error)
    toast({
      description: error.response.data.error,
      duration: 1000,
      variant: 'destructive',
    })
  }
}

onMounted(async () => {
  await getAllUsers()
})
</script>

<template>
  <div class="mb-4">
    <Dialog>
      <DialogTrigger as-child>
        <Button> <UserRoundPlus class="w-4 h-4" /> Register user </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, praesentium!
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="tel" class="text-right"> Phone </Label>
            <Input id="tel" type="tel" class="col-span-3" v-model="phoneNumber" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="password" class="text-right"> Password </Label>
            <Input id="password" type="password" class="col-span-3" v-model="password" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="role" class="text-right">Role</Label>
            <Select id="role" v-model="role">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="user"> User </SelectItem>
                  <SelectItem value="admin"> Admin </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right"> Name </Label>
            <Input id="name" type="text" class="col-span-3" v-model="name" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" @click="registerUser"> Add </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>

  <Table>
    <TableCaption>A list of users.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead> Id </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead class="text-right"> Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in data" :key="user.id">
        <TableCell class="font-medium">
          {{ user.id }}
        </TableCell>
        <TableCell>{{ user.name }}</TableCell>
        <TableCell>{{ user.isAdmin ? 'Admin' : 'User' }}</TableCell>
        <TableCell class="flex justify-end gap-2">
          <Button variant="outline" size="icon">
            <PenLine />
          </Button>

          <Button variant="destructive" size="icon" @click="deleteUser(user.id)">
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
