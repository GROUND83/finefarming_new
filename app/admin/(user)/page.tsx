"use client";
import React, { useRef } from "react";
import Input from "@/components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
export default function UserList() {
  redirect("/admin/farmer");
}
