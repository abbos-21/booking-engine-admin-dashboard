<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApiService from '@/api'
import { useToast } from '@/components/ui/toast/use-toast'
import { API_URL } from '@/api'

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

import { Badge } from '@/components/ui/badge'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { Trash2, PenLine, UserRoundPlus, Eye } from 'lucide-vue-next'

const { toast } = useToast()

const roomNumber = ref<any>()
const roomName = ref<any>()
const roomDescription = ref<any>()
const roomPrice = ref<any>()

const createRoom = async () => {
  try {
    const response = await ApiService.createRoom(
      localStorage.getItem('token'),
      roomNumber.value,
      roomName.value,
      roomDescription.value,
      roomPrice.value,
    )
    await getAllRooms()
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

const currentRoom = ref<any>(null)

const openEditDialog = (room: any) => {
  currentRoom.value = { ...room }
}

const updateRoom = async (room: any) => {
  try {
    const response = await ApiService.updateRoom(
      localStorage.getItem('token'),
      room.id,
      room.number,
      room.name,
      room.description,
      room.price,
    )
    await getAllRooms()
    toast({
      description: response.message,
      duration: 1000,
    })
  } catch (error: any) {
    console.error(error)
    toast({
      description: error.response.data.error,
      duration: 1000,
      variant: 'destructive',
    })
  }
}

const deleteRoom = async (roomId: any) => {
  try {
    const response = await ApiService.deleteRoom(localStorage.getItem('token'), roomId)
    await getAllRooms()
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

const getAllRooms = async () => {
  try {
    const rooms = await ApiService.getAllRooms(localStorage.getItem('token'))
    if (rooms && Array.isArray(rooms)) {
      rooms.forEach((room: any) => {
        if (room.imgs) {
          room.imgs = room.imgs.split(',')
        }
      })
      data.value = rooms
      console.log(data.value)
    } else {
      console.error('Invalid response or empty data:', rooms)
    }
  } catch (error: any) {
    console.log(error)
    toast({
      description: error.response.data.error,
      duration: 1000,
      variant: 'destructive',
    })
  }
}

const imageFiles = ref<any>([])
const handleFileUpload = (event: any) => {
  const files = event.target.files
  if (files) {
    imageFiles.value = Array.from(files)
  }
}

const addThumbnailToRoom = async (roomId: any) => {
  const formData = new FormData()
  formData.append('roomId', roomId.toString())
  imageFiles.value.forEach((file: any) => formData.append('images', file))

  try {
    const response = await ApiService.addThumbnailToRoom(localStorage.getItem('token'), formData)
    toast({
      description: response.message,
      duration: 1000,
    })
    await getAllRooms()
  } catch (error: any) {
    console.error(error)
    toast({
      description: error.response?.data?.error || 'Failed to upload images',
      duration: 1000,
      variant: 'destructive',
    })
  } finally {
    imageFiles.value = []
  }
}

const deleteImageFromRoom = async (roomId: number, imageUrl: string) => {
  try {
    const response = await ApiService.deleteRoomImage(
      localStorage.getItem('token'),
      roomId,
      imageUrl,
    )
    toast({
      description: response.message,
      duration: 1000,
    })
    await getAllRooms()
  } catch (error: any) {
    console.error(error)
    toast({
      description: error.response?.data?.error || 'Failed to delete image',
      duration: 1000,
      variant: 'destructive',
    })
  }
}

const editedImageFile = ref<any>(null)
const editImageInRoom = async (roomId: number, oldImageUrl: string, newImageFile: File) => {
  const formData = new FormData()
  formData.append('roomId', roomId.toString())
  formData.append('oldImageUrl', oldImageUrl)
  formData.append('image', newImageFile)

  try {
    const response = await ApiService.editRoomImage(localStorage.getItem('token'), formData)
    toast({
      description: response.message,
      duration: 1000,
    })
    await getAllRooms()
  } catch (error: any) {
    console.error(error)
    toast({
      description: error.response?.data?.error || 'Failed to edit image',
      duration: 1000,
      variant: 'destructive',
    })
  } finally {
    editedImageFile.value = null
  }
}

onMounted(async () => {
  await getAllRooms()
})
</script>

<template>
  <div class="mb-4">
    <Dialog>
      <DialogTrigger as-child>
        <Button> <UserRoundPlus class="w-4 h-4" /> Add room </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create room</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, praesentium!
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="roomNumber" class="text-right"> Number </Label>
            <Input id="roomNumber" type="text" class="col-span-3" v-model="roomNumber" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="roomName" class="text-right"> Name </Label>
            <Input id="roomName" type="text" class="col-span-3" v-model="roomName" />
          </div>

          <!-- <div class="grid grid-cols-4 items-center gap-4">
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
          </div> -->

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="roomDescription" class="text-right"> Description </Label>
            <Input id="roomDescription" type="text" class="col-span-3" v-model="roomDescription" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="roomPrice" class="text-right"> Price </Label>
            <Input id="roomPrice" type="number" class="col-span-3" v-model="roomPrice" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" @click="createRoom"> Add </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>

  <Table>
    <TableCaption>A list of rooms.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead> № </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Next available time</TableHead>
        <TableHead> Thumbnails </TableHead>
        <TableHead class="text-right"> Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="room in data" :key="room.id">
        <TableCell class="font-medium">
          {{ room.number }}
        </TableCell>
        <TableCell>{{ room.name }}</TableCell>
        <TableCell>${{ room.price }}</TableCell>
        <TableCell>
          <Badge :variant="room.isAvailable ? 'outline' : 'destructive'">
            {{ room.isAvailable ? 'Free' : 'Occupied' }}
          </Badge>
        </TableCell>
        <TableCell>
          {{ room.isAvailable ? 'Available now' : `${room.nextAvailableDateTime}` }}
        </TableCell>
        <TableCell>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline" size="icon">
                <Eye />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Images</DialogTitle>
                <DialogDescription>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, praesentium!
                </DialogDescription>
              </DialogHeader>

              <div class="grid grid-cols-3 gap-4" v-if="room.imgs">
                <div v-for="(image, index) in room.imgs" :key="index" class="relative">
                  <img
                    :src="`${API_URL}${image}`"
                    :alt="'Room Image ' + (index + 1)"
                    class="w-full h-auto rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    class="absolute top-2 right-2"
                    @click="deleteImageFromRoom(room.id, image)"
                  >
                    <Trash2 />
                  </Button>

                  <Dialog>
                    <DialogTrigger>
                      <Button size="icon" variant="outline" class="absolute top-2 right-12">
                        <PenLine /> </Button
                    ></DialogTrigger>

                    <DialogContent>
                      <form
                        @submit.prevent="
                          () => {
                            if (editedImageFile) {
                              editImageInRoom(room.id, image, editedImageFile)
                            }
                          }
                        "
                      >
                        <Input
                          class="w-3/4"
                          type="file"
                          accept="image/*"
                          @change="
                            (event: any) => {
                              editedImageFile = event.target.files?.[0]
                            }
                          "
                        />

                        <Button type="submit" class="mt-2 float-right">Submit</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div v-else class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="picture">There are no images yet. Add one</Label>
                <Input
                  id="picture"
                  type="file"
                  multiple
                  @change="handleFileUpload"
                  accept="image/*"
                />
              </div>

              <DialogFooter>
                <Button type="submit" @click="addThumbnailToRoom(room.id)"> Save </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
        <TableCell class="flex justify-end gap-2">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline" size="icon" @click="openEditDialog(room)">
                <PenLine />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit room</DialogTitle>
                <DialogDescription>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, praesentium!
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="roomNumber" class="text-right"> Number </Label>
                  <Input
                    id="roomNumber"
                    type="text"
                    class="col-span-3"
                    v-model="currentRoom.number"
                  />
                </div>

                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="roomName" class="text-right"> Name </Label>
                  <Input id="roomName" type="text" class="col-span-3" v-model="currentRoom.name" />
                </div>

                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="roomDescription" class="text-right"> Description </Label>
                  <Input
                    id="roomDescription"
                    type="text"
                    class="col-span-3"
                    v-model="currentRoom.description"
                  />
                </div>

                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="roomPrice" class="text-right"> Price </Label>
                  <Input
                    id="roomPrice"
                    type="number"
                    class="col-span-3"
                    v-model="currentRoom.price"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" @click="updateRoom(currentRoom)"> Save </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="destructive" size="icon" @click="deleteRoom(room.id)">
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
