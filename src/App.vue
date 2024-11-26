<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'

import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Bell, CircleUser, Home, Menu, Package2, Search, Users, Bed, Gem } from 'lucide-vue-next'
import { onMounted } from 'vue'
import checkIfUserIsAuthenticated from './auth'

const route = useRoute()

const getLinkClass = (path: string) => {
  return route.path === path ? 'bg-muted text-primary' : 'text-muted-foreground'
}

const isAuthenticated = checkIfUserIsAuthenticated()

const logout = () => {
  localStorage.clear()
  location.reload()
}

// onMounted(() => {
//   localStorage.clear()
// })
</script>

<template>
  <Toaster />

  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
    v-if="isAuthenticated"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <RouterLink to="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">Acme Inc</span>
          </RouterLink>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <!-- <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <RouterLink
              to="/"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home class="h-4 w-4" />
              Dashboard
            </RouterLink>
            <RouterLink
              to="/users"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users class="h-4 w-4" />
              Users
              <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </RouterLink>
            <RouterLink
              to="/rooms"
              class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Bed class="h-4 w-4" />
              Rooms
            </RouterLink>
            <RouterLink
              to="/reservations"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Gem class="h-4 w-4" />
              Reservations
            </RouterLink>
          </nav> -->

          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <RouterLink
              to="/"
              :class="getLinkClass('/')"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <Home class="h-4 w-4" />
              Dashboard
            </RouterLink>
            <RouterLink
              to="/users"
              :class="getLinkClass('/users')"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <Users class="h-4 w-4" />
              Users
              <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </RouterLink>
            <RouterLink
              to="/rooms"
              :class="getLinkClass('/rooms')"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <Bed class="h-4 w-4" />
              Rooms
            </RouterLink>
            <RouterLink
              to="/reservations"
              :class="getLinkClass('/reservations')"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <Gem class="h-4 w-4" />
              Reservations
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header
        class="flex h-14 items-center justify-between md:justify-end border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
      >
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
              <RouterLink to="/" class="flex items-center gap-2 text-lg font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Acme Inc</span>
              </RouterLink>

              <RouterLink
                to="/"
                :class="[
                  getLinkClass('/'),
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
                ]"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </RouterLink>

              <RouterLink
                to="/users"
                :class="[
                  getLinkClass('/users'),
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
                ]"
              >
                <Users class="h-5 w-5" />
                Users
                <Badge
                  class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                >
                  6
                </Badge>
              </RouterLink>

              <RouterLink
                to="/rooms"
                :class="[
                  getLinkClass('/rooms'),
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
                ]"
              >
                <Bed class="h-5 w-5" />
                Rooms
              </RouterLink>

              <RouterLink
                to="/reservations"
                :class="[
                  getLinkClass('/reservations'),
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
                ]"
              >
                <Gem class="h-5 w-5" />
                Reservations
              </RouterLink>
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="p-4">
        <RouterView />
      </main>
    </div>
  </div>

  <RouterView v-else />
</template>

<style scoped></style>
